#!/usr/bin/env bash
set -euo pipefail

RENDERED_TASK_DEFINITION_FILE=${RENDERED_TASK_DEFINITION_FILE:-task-definition.rendered.json}
APP_VERSION_FILE=${APP_VERSION_FILE:-package.json}
APP_CONTAINER_NAME=${APP_CONTAINER_NAME:-jtech-portal}
TASK_DEFINITION_FILE=${TASK_DEFINITION_FILE:-strapi-backend/task-definition.json}

require_variable() {
    local variable_name="$1"
    if [[ -z "${!variable_name:-}" ]]; then
        echo "Variavel obrigatoria nao definida: ${variable_name}" >&2
        exit 1
    fi
}

resolve_version() {
    local version="" suffix=""
    if [[ -n "${APP_VERSION:-}" ]]; then
        version="$APP_VERSION"
    elif [[ -n "${CI_COMMIT_TAG:-}" ]]; then
        version="$CI_COMMIT_TAG"
    elif [[ "$APP_VERSION_FILE" == *.json ]]; then
        version=$(node -p "require('./$APP_VERSION_FILE').version")
    else
        version=$(grep '^APP_VERSION=' "$APP_VERSION_FILE" -m 1 | cut -d '=' -f2- | xargs)
    fi
    if [[ -z "$version" ]]; then
        echo "Versao da aplicacao nao encontrada" >&2
        exit 1
    fi
    if [[ -z "${APP_VERSION:-}" && "${CI_COMMIT_BRANCH:-}" != "main" &&
        "${CI_COMMIT_BRANCH:-}" != "develop" && -z "${CI_COMMIT_TAG:-}" &&
        "${CI_PIPELINE_SOURCE:-}" != "merge_request_event" ]]; then
        suffix="-${CI_COMMIT_REF_SLUG:-${CI_COMMIT_BRANCH:-local}}"
    fi
    printf '%s%s' "$version" "$suffix"
}

resolve_image_uri() {
    local version
    version=$(resolve_version)
    if [[ -n "${ECR_REGISTRY:-}" && -n "${ECR_REPOSITORY:-}" ]]; then
        printf '%s/%s:%s' "$ECR_REGISTRY" "$ECR_REPOSITORY" "$version"
    else
        require_variable CI_REGISTRY_IMAGE
        printf '%s:%s' "$CI_REGISTRY_IMAGE" "$version"
    fi
}

render_task_definition() {
    local image_uri="$1"
    jq --arg name "$APP_CONTAINER_NAME" --arg image "$image_uri" '
      {
        family, taskRoleArn, executionRoleArn, networkMode, containerDefinitions,
        volumes, placementConstraints, requiresCompatibilities, cpu, memory, tags,
        pidMode, ipcMode, proxyConfiguration, inferenceAccelerators,
        ephemeralStorage, runtimePlatform, enableFaultInjection
      }
      | with_entries(select(.value != null))
      | (.containerDefinitions[] | select(.name == $name)).image = $image
    ' "$TASK_DEFINITION_FILE" > "$RENDERED_TASK_DEFINITION_FILE"
}

main() {
    local image_uri task_definition_arn
    require_variable AWS_DEFAULT_REGION
    require_variable ECS_CLUSTER_NAME
    require_variable ECS_SERVICE_NAME
    [[ -f "$TASK_DEFINITION_FILE" ]] || { echo "Task definition nao encontrada: $TASK_DEFINITION_FILE" >&2; exit 1; }
    image_uri=$(resolve_image_uri)
    render_task_definition "$image_uri"
    task_definition_arn=$(aws ecs register-task-definition --region "$AWS_DEFAULT_REGION" \
        --cli-input-json "file://$RENDERED_TASK_DEFINITION_FILE" \
        --query 'taskDefinition.taskDefinitionArn' --output text)
    aws ecs update-service --region "$AWS_DEFAULT_REGION" --cluster "$ECS_CLUSTER_NAME" \
        --service "$ECS_SERVICE_NAME" --task-definition "$task_definition_arn"
    aws ecs wait services-stable --region "$AWS_DEFAULT_REGION" \
        --cluster "$ECS_CLUSTER_NAME" --services "$ECS_SERVICE_NAME"
}

main "$@"
