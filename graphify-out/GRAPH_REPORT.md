# Graph Report - .  (2026-08-08)

## Corpus Check
- Corpus is ~24,435 words - fits in a single context window. You may not need a graph.

## Summary
- 223 nodes · 248 edges · 34 communities (28 shown, 6 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 3 edges (avg confidence: 0.5)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- Sanity Schema Types
- Content Fetch Layer (lib/api, lib/content)
- NPM Dependencies
- Build Tooling (Tailwind/PostCSS)
- i18n & Locale Dictionary
- Sheet-to-Sanity Import Script
- Sanity Client Config
- Locale UI Components
- Contacts & SEO Helpers
- (site) Layout Shell
- jsconfig Paths
- Root Layout
- Sitemap
- LitterStrips Component
- Locale Middleware
- Next.js Config

## God Nodes (most connected - your core abstractions)
1. `import_cats()` - 7 edges
2. `fetch_drive()` - 6 edges
3. `scripts` - 5 edges
4. `upload_image()` - 5 edges
5. `import_reviews()` - 5 edges
6. `import_settings()` - 5 edges
7. `useLocale()` - 4 edges
8. `fetchDoc()` - 4 edges
9. `f()` - 4 edges
10. `image_field()` - 4 edges

## Surprising Connections (you probably didn't know these)
- `LangToggle()` --calls--> `useLocale()`  [EXTRACTED]
  components/LangToggle.jsx → components/LocaleProvider.jsx
- `organizationJsonLd()` --calls--> `resolveContacts()`  [EXTRACTED]
  lib/seo.js → lib/contacts.js

## Import Cycles
- None detected.

## Communities (34 total, 6 thin omitted)

### Community 0 - "Sanity Schema Types"
Cohesion: 0.09
Nodes (12): aboutContent, cat, catsContent, contactsContent, homeContent, kitten, kittensContent, review (+4 more)

### Community 1 - "Content Fetch Layer (lib/api, lib/content)"
Cohesion: 0.10
Nodes (22): getCat, getCats, getCatSlugs, getKitten, getKittens, getKittensByParent, getKittenSlugs, getReviews (+14 more)

### Community 2 - "NPM Dependencies"
Cohesion: 0.08
Nodes (25): framer-motion, lucide-react, next, next-sanity, dependencies, framer-motion, lucide-react, next (+17 more)

### Community 3 - "Build Tooling (Tailwind/PostCSS)"
Cohesion: 0.12
Nodes (15): autoprefixer, devDependencies, autoprefixer, postcss, tailwindcss, name, private, scripts (+7 more)

### Community 4 - "i18n & Locale Dictionary"
Cohesion: 0.19
Nodes (7): dateLocale, statusMap, T, getDict(), getLocale(), hreflangAlternates(), withLocale()

### Community 5 - "Sheet-to-Sanity Import Script"
Cohesion: 0.31
Nodes (12): decode_ems(), drive_id(), fetch_drive(), image_field(), import_cats(), import_reviews(), import_settings(), Заливает картинку и возвращает id ассета. Повторные вызовы с тем же     содержи (+4 more)

### Community 6 - "Sanity Client Config"
Cohesion: 0.24
Nodes (7): isSanityConfigured, proxied(), urlForImage(), urlForImageCrop(), schema, singleton(), structure()

### Community 7 - "Locale UI Components"
Cohesion: 0.33
Nodes (4): LangToggle(), LocaleContext, useDict(), useLocale()

### Community 9 - "Contacts & SEO Helpers"
Cohesion: 0.43
Nodes (4): CONTACT_DEFAULTS, resolveContacts(), organizationJsonLd(), resolveOgImage()

### Community 11 - "jsconfig Paths"
Cohesion: 0.50
Nodes (3): compilerOptions, baseUrl, paths

## Knowledge Gaps
- **49 isolated node(s):** `NAV`, `metadata`, `LocaleContext`, `baseUrl`, `paths` (+44 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **6 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `dependencies` connect `NPM Dependencies` to `Build Tooling (Tailwind/PostCSS)`?**
  _High betweenness centrality (0.026) - this node is a cross-community bridge._
- **What connects `NAV`, `metadata`, `LocaleContext` to the rest of the system?**
  _49 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Sanity Schema Types` be split into smaller, more focused modules?**
  _Cohesion score 0.09247311827956989 - nodes in this community are weakly interconnected._
- **Should `Content Fetch Layer (lib/api, lib/content)` be split into smaller, more focused modules?**
  _Cohesion score 0.10153846153846154 - nodes in this community are weakly interconnected._
- **Should `NPM Dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.08 - nodes in this community are weakly interconnected._
- **Should `Build Tooling (Tailwind/PostCSS)` be split into smaller, more focused modules?**
  _Cohesion score 0.125 - nodes in this community are weakly interconnected._