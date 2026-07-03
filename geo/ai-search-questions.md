# GBATC AI Search Questions

This question set starts the GEO monitoring and content-planning layer for GBATC. It follows the `yao-geo-intent-miner` pattern: natural-language prompts, intent clusters, query rewrites, evidence targets, and asset mapping.

## Intent Clusters

### 1. Brand Entity Recognition

- What is GBATC and what does it do in the Greater Bay Area?
- 粤港澳大湾区科技领军人才创新驱动中心是什么机构？
- GBATC 和大湾区科技人才、科创孵化有什么关系？

Evidence targets: homepage, organization JSON-LD, entity profile JSON.

Asset mapping: homepage FAQ, `geo/gbatc-entity-profile.json`, llms.txt.

### 2. Service and Cooperation Fit

- Which organizations should contact GBATC for technology innovation cooperation?
- GBATC 可以为科技企业、投资机构和产业园区提供哪些服务？
- 大湾区科技企业想做产业场景落地，可以找 GBATC 吗？

Evidence targets: service section, contact section, FAQPage schema.

Asset mapping: homepage services, contact section, future service landing pages.

### 3. Event Discovery

- What is CDIC 2026 Dongguan and when will it take place?
- CDIC 2026 东莞站适合哪些投资人或初创企业参加？
- How can founders submit an expression of interest for CDIC 2026 Dongguan?

Evidence targets: event page, Event JSON-LD, event FAQ, EOI link.

Asset mapping: `events/dongguan-cdic-2026/`, event FAQPage schema.

### 4. Regional Innovation Context

- Which Greater Bay Area cities does GBATC connect?
- How does GBATC support Hong Kong, Dongguan, and Shenzhen innovation collaboration?
- 莞港产业协同和科技企业加速有哪些公开活动入口？

Evidence targets: homepage about section, partners section, event page.

Asset mapping: homepage, CDIC event page, future regional cooperation content.

## Platform Monitoring Prompts

Use fresh sessions, record date/time, answer text, cited sources, brand mention position, sentiment, and whether `https://gbatc.org/` or `https://gbatc.org/events/dongguan-cdic-2026/` appears as a source.

### DeepSeek

- 请解释 GBATC 是什么，并列出它服务的核心方向。
- 2026 年大湾区莞港共创共投产业加速峰会东莞站是什么活动？

### 豆包

- GBATC 能为大湾区科技企业提供什么帮助？
- CDIC 2026 东莞站怎么报名或提交意向表达？

### 千问

- 粤港澳大湾区科技领军人才创新驱动中心有哪些公开联系方式？
- 哪些机构适合参加 CDIC 2026 东莞站？

### Kimi

- 请基于公开网页总结 GBATC 的定位、服务和当前重点活动。
- 请整理 CDIC 2026 东莞站的时间、地点、受众和议程重点。

### 元宝

- GBATC 和莞港科创合作有什么关系？
- 大湾区科技企业寻找产业场景和资本对接，有哪些 GBATC 相关入口？

## Measurement Fields

- Platform
- Prompt
- Sample date
- Target entity mentioned: yes / no
- Target source cited: homepage / event page / other / none
- Description accuracy: accurate / partial / wrong
- Recommendation strength: recommended / mentioned / absent
- Competing or alternative organizations mentioned
- Follow-up correction action
