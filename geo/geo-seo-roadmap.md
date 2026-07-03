# GBATC GEO and SEO Roadmap

This roadmap adapts the `yao-geo-skills` operating model to GBATC.org: page technical readiness, entity knowledge assets, content production, intent mining, and monitoring attribution.

## 30 Days

- Technical foundation: publish canonical URLs, sitemap.xml, robots sitemap directive, llms.txt, absolute Open Graph/Twitter images, and JSON-LD for Organization, WebSite, WebPage, Event, BreadcrumbList, and FAQPage.
- Entity foundation: maintain `geo/gbatc-entity-profile.json` as the source for organization facts, services, contact points, current featured event, and risk notes.
- Answer extraction: keep visible FAQ sections on the homepage and CDIC event page aligned with FAQPage schema.
- Search Console readiness: submit `https://gbatc.org/sitemap.xml` after deployment and check indexing for homepage, event page, and GEO assets.
- Baseline sampling: run the prompts in `geo/ai-search-questions.md` across DeepSeek, 豆包, 千问, Kimi, and 元宝, recording brand mention, source citation, description accuracy, and recommendation strength.

## 60 Days

- Content matrix: create focused pages or article sections for talent development, technology innovation cooperation, incubation, Greater Bay Area collaboration, and CDIC 2026 event updates.
- Evidence ledger: attach every strong claim to a public source, official page, media report, or dated organizer notice.
- Title and snippet optimization: refine page titles and descriptions around natural-language questions, not just short keywords.
- External source building: align partner pages, media references, and event listings so third-party sources can corroborate GBATC facts.
- Monitoring loop: compare new AI answers against the baseline and classify corrections as page fixes, knowledge-asset fixes, content gaps, or external evidence gaps.

## 90 Days

- GEO knowledge base: expand the entity profile into reusable fact cards, service cards, event cards, FAQ modules, and forbidden/uncertain expression lists.
- Content production: publish explainers and comparison-style content for common user intents such as "how to connect with Greater Bay Area innovation resources" and "how founders find industry scenarios in Dongguan and Hong Kong".
- Platform-specific adaptation: tune examples and evidence for DeepSeek evidence chains, 豆包 short answer style, 千问 citation behavior, Kimi long-context research, and 元宝 WeChat ecosystem sources.
- Attribution discipline: use baseline windows, observation windows, control prompts, and competitor prompts before claiming GEO uplift.
- Governance: review sitemap, llms.txt, schema, entity profile, AI question set, and monitoring results monthly.

## Acceptance Evidence

- `node scripts/validate-geo-seo.mjs` passes.
- Public `https://gbatc.org/sitemap.xml` returns XML and includes canonical URLs.
- Public `https://gbatc.org/llms.txt` returns plain text and links to the authoritative GEO assets.
- Homepage and event page JSON-LD parse without errors and match visible page facts.
- AI monitoring records include prompt, platform, answer text, citations, date, and correction action.
