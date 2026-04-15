-- ============================================
-- DATABASE OPTIMIZATION - CRITICAL INDEXES
-- ============================================
-- Run this migration after Strapi schema is created
-- Execute: psql -U strapi -d jtech_strapi -f 001-add-indexes.sql

-- ============================================
-- POSTS TABLE
-- ============================================

-- Unique constraint: slug must be unique per locale
-- Prevents duplicate URLs
ALTER TABLE posts 
ADD CONSTRAINT unique_slug_locale UNIQUE (slug, locale);

-- Index for slug + locale lookups (most common query)
CREATE INDEX IF NOT EXISTS idx_posts_slug_locale 
ON posts(slug, locale);

-- Index for publishedAt (sorting in listings)
CREATE INDEX IF NOT EXISTS idx_posts_published_at 
ON posts(published_at DESC NULLS LAST);

-- Index for locale filtering
CREATE INDEX IF NOT EXISTS idx_posts_locale 
ON posts(locale);

-- Composite index for published content queries
CREATE INDEX IF NOT EXISTS idx_posts_published_locale 
ON posts(locale, published_at DESC) 
WHERE published_at IS NOT NULL;

-- ============================================
-- EBOOKS TABLE
-- ============================================

-- Unique constraint: slug must be unique per locale
ALTER TABLE ebooks 
ADD CONSTRAINT unique_ebook_slug_locale UNIQUE (slug, locale);

-- Index for slug + locale lookups
CREATE INDEX IF NOT EXISTS idx_ebooks_slug_locale 
ON ebooks(slug, locale);

-- Index for publishedAt
CREATE INDEX IF NOT EXISTS idx_ebooks_published_at 
ON ebooks(published_at DESC NULLS LAST);

-- Index for locale filtering
CREATE INDEX IF NOT EXISTS idx_ebooks_locale 
ON ebooks(locale);

-- Composite index for published content queries
CREATE INDEX IF NOT EXISTS idx_ebooks_published_locale 
ON ebooks(locale, published_at DESC) 
WHERE published_at IS NOT NULL;

-- ============================================
-- PREVIEW TOKENS TABLE
-- ============================================

-- Index for token hash lookup (most critical query)
CREATE INDEX IF NOT EXISTS idx_preview_tokens_hash 
ON preview_tokens(token_hash);

-- Composite index for token validation query
-- Covers: tokenHash + contentType + slug + locale
CREATE INDEX IF NOT EXISTS idx_preview_tokens_lookup 
ON preview_tokens(token_hash, content_type, slug, locale);

-- Index for cleanup query (expiresAt)
CREATE INDEX IF NOT EXISTS idx_preview_tokens_expires 
ON preview_tokens(expires_at) 
WHERE used_at IS NULL;

-- Index for audit queries (find tokens by creator)
CREATE INDEX IF NOT EXISTS idx_preview_tokens_creator 
ON preview_tokens(created_by, created_at DESC);

-- ============================================
-- CATEGORIES TABLE
-- ============================================

-- Index for slug lookups
CREATE INDEX IF NOT EXISTS idx_categories_slug 
ON categories(slug);

-- ============================================
-- AUTHORS TABLE
-- ============================================

-- Index for slug lookups
CREATE INDEX IF NOT EXISTS idx_authors_slug 
ON authors(slug);

-- ============================================
-- VERIFICATION
-- ============================================

-- Verify indexes were created
SELECT 
    schemaname,
    tablename,
    indexname,
    indexdef
FROM pg_indexes
WHERE schemaname = 'public'
AND tablename IN ('posts', 'ebooks', 'preview_tokens', 'categories', 'authors')
ORDER BY tablename, indexname;

-- ============================================
-- PERFORMANCE NOTES
-- ============================================
-- 
-- These indexes will dramatically improve:
-- 1. /:lang/conteudo/:slug queries (idx_posts_slug_locale)
-- 2. Latest posts listings (idx_posts_published_at)
-- 3. Preview token validation (idx_preview_tokens_lookup)
-- 4. Token cleanup job (idx_preview_tokens_expires)
--
-- Index maintenance:
-- - PostgreSQL auto-updates indexes on INSERT/UPDATE
-- - Run VACUUM ANALYZE monthly for optimal performance
-- - Monitor index usage: pg_stat_user_indexes
-- ============================================
