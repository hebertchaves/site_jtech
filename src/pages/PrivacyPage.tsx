import { Lang, t } from "../lib/i18n"
import { Container } from "../components/layout/Container"
import { ScrollToTop } from "../components/ScrollToTop"

interface PrivacyPageProps {
  lang: Lang
}

export function PrivacyPage({ lang }: PrivacyPageProps) {
  return (
    <>
      {/* ====================================
          PRIVACY POLICY SECTION
          Política de Privacidade e LGPD
          ==================================== */}
      <div className="pt-32 pb-20">
        <Container>
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl mb-8">{t(lang, "footer.privacy")}</h1>
            
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-600 mb-6">
                Última atualização: 19 de fevereiro de 2026
              </p>

              <h2>1. Introdução</h2>
              <p>
                A Jtech ("nós", "nosso" ou "nossa") está comprometida em proteger sua privacidade.
                Esta Política de Privacidade explica como coletamos, usamos, divulgamos e
                protegemos suas informações quando você visita nosso site.
              </p>

              <h2>2. Informações que Coletamos</h2>
              <p>Coletamos informações que você nos fornece diretamente, incluindo:</p>
              <ul>
                <li>Nome e informações de contato (e-mail, telefone)</li>
                <li>Informações da empresa</li>
                <li>Mensagens e comunicações</li>
                <li>Preferências de marketing</li>
              </ul>

              <h2>3. Uso de Cookies</h2>
              <p>
                Utilizamos cookies e tecnologias similares para melhorar sua experiência,
                analisar o tráfego do site e personalizar conteúdo. Você pode gerenciar suas
                preferências de cookies através do banner de consentimento.
              </p>

              <h2>4. Como Usamos Suas Informações</h2>
              <p>Usamos suas informações para:</p>
              <ul>
                <li>Responder suas solicitações e perguntas</li>
                <li>Fornecer nossos produtos e serviços</li>
                <li>Enviar comunicações de marketing (com seu consentimento)</li>
                <li>Melhorar nosso site e serviços</li>
                <li>Cumprir obrigações legais</li>
              </ul>

              <h2>5. Compartilhamento de Informações</h2>
              <p>
                Não vendemos suas informações pessoais. Podemos compartilhar suas informações
                com prestadores de serviços que nos auxiliam em nossas operações, sempre sob
                obrigações de confidencialidade.
              </p>

              <h2>6. Seus Direitos (LGPD)</h2>
              <p>De acordo com a Lei Geral de Proteção de Dados (LGPD), você tem o direito de:</p>
              <ul>
                <li>Confirmar a existência de tratamento de dados</li>
                <li>Acessar seus dados</li>
                <li>Corrigir dados incompletos ou incorretos</li>
                <li>Solicitar anonimização ou eliminação de dados</li>
                <li>Revogar consentimento</li>
                <li>Obter informações sobre compartilhamento de dados</li>
              </ul>

              <h2>7. Segurança</h2>
              <p>
                Implementamos medidas de segurança técnicas e organizacionais para proteger
                suas informações contra acesso não autorizado, perda ou alteração.
              </p>

              <h2>8. Retenção de Dados</h2>
              <p>
                Mantemos suas informações pelo tempo necessário para cumprir os propósitos
                descritos nesta política, a menos que um período de retenção maior seja
                exigido por lei.
              </p>

              <h2>9. Contato</h2>
              <p>
                Para exercer seus direitos ou esclarecer dúvidas sobre esta política, entre
                em contato conosco:
              </p>
              <p>
                E-mail: privacidade@jtech.com.br<br />
                Telefone: +55 (11) 9999-9999<br />
                Endereço: Av. Paulista, 1000 - São Paulo/SP
              </p>

              <h2>10. Alterações</h2>
              <p>
                Podemos atualizar esta Política de Privacidade periodicamente. A data da
                última atualização será sempre indicada no topo da página.
              </p>
            </div>
          </div>
        </Container>
      </div>

      {/* Componente de Scroll to Top com mouse animado */}
      <ScrollToTop showThreshold={200} />
    </>
  )
}