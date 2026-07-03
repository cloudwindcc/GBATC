import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const HOME_URL = "https://gbatc.org/";
const EVENT_URL = "https://gbatc.org/events/dongguan-cdic-2026/";

const failures = [];

function check(condition, message) {
  if (!condition) failures.push(message);
}

function read(relPath) {
  const filePath = path.join(ROOT, relPath);
  if (!existsSync(filePath)) {
    failures.push(`Missing required file: ${relPath}`);
    return "";
  }
  return readFileSync(filePath, "utf8");
}

function extractJsonLd(html, relPath) {
  const blocks = [];
  const regex = /<script\s+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  for (const match of html.matchAll(regex)) {
    try {
      blocks.push(JSON.parse(match[1]));
    } catch (error) {
      failures.push(`Invalid JSON-LD in ${relPath}: ${error.message}`);
    }
  }
  return blocks.flatMap((block) => block["@graph"] || [block]);
}

function hasJsonLdType(nodes, type) {
  return nodes.some((node) => {
    const nodeType = node["@type"];
    return Array.isArray(nodeType) ? nodeType.includes(type) : nodeType === type;
  });
}

const homeHtml = read("index.html");
const eventHtml = read("events/dongguan-cdic-2026/index.html");
const robotsTxt = read("robots.txt");
const sitemapXml = read("sitemap.xml");
const llmsTxt = read("llms.txt");
const entityProfileJson = read("geo/gbatc-entity-profile.json");
const aiQuestionsMd = read("geo/ai-search-questions.md");
const roadmapMd = read("geo/geo-seo-roadmap.md");

let entityProfile = {};
if (entityProfileJson) {
  try {
    entityProfile = JSON.parse(entityProfileJson);
  } catch (error) {
    failures.push(`Invalid JSON in geo/gbatc-entity-profile.json: ${error.message}`);
  }
}

check(robotsTxt.includes(`Sitemap: ${HOME_URL}sitemap.xml`), "robots.txt must point crawlers to the canonical sitemap URL.");

check(sitemapXml.trimStart().startsWith("<?xml"), "sitemap.xml must be XML, not an HTML fallback.");
check(!sitemapXml.includes("<!DOCTYPE html>"), "sitemap.xml must not contain homepage HTML.");
check(sitemapXml.includes(`<loc>${HOME_URL}</loc>`), "sitemap.xml must include the homepage canonical URL.");
check(sitemapXml.includes(`<loc>${EVENT_URL}</loc>`), "sitemap.xml must include the CDIC event canonical URL.");
check(sitemapXml.includes(`<loc>${HOME_URL}geo/gbatc-entity-profile.json</loc>`), "sitemap.xml must include the public GEO entity profile.");
check(sitemapXml.includes(`<loc>${HOME_URL}geo/ai-search-questions.md</loc>`), "sitemap.xml must include the public AI search question set.");
check(sitemapXml.includes(`<loc>${HOME_URL}geo/geo-seo-roadmap.md</loc>`), "sitemap.xml must include the public GEO/SEO roadmap.");

check(llmsTxt.includes("# GBATC.org"), "llms.txt must start with a clear site title.");
check(llmsTxt.includes(HOME_URL), "llms.txt must include the homepage canonical URL.");
check(llmsTxt.includes(EVENT_URL), "llms.txt must include the event canonical URL.");
check(llmsTxt.includes(`${HOME_URL}geo/gbatc-entity-profile.json`), "llms.txt must reference the public GEO entity profile.");
check(llmsTxt.includes(`${HOME_URL}geo/ai-search-questions.md`), "llms.txt must reference the AI search question set.");
check(llmsTxt.includes(`${HOME_URL}geo/geo-seo-roadmap.md`), "llms.txt must reference the GEO/SEO roadmap.");
check(llmsTxt.includes("粤港澳大湾区科技领军人才创新驱动中心"), "llms.txt must expose the GBATC entity name.");
check(llmsTxt.includes("CDIC 2026"), "llms.txt must expose the CDIC 2026 event topic.");

check(entityProfile.name === "粤港澳大湾区科技领军人才创新驱动中心", "Entity profile must expose the GBATC legal/public entity name.");
check(entityProfile.url === HOME_URL, "Entity profile must use the homepage canonical URL.");
check(Array.isArray(entityProfile.coreServices) && entityProfile.coreServices.length >= 4, "Entity profile must expose at least four core service areas.");
check(entityProfile.currentFeaturedEvent?.url === EVENT_URL, "Entity profile must link to the canonical featured event URL.");

check(aiQuestionsMd.includes("# GBATC AI Search Questions"), "AI search questions must include a clear title.");
check(aiQuestionsMd.includes("## Intent Clusters"), "AI search questions must group prompts by intent cluster.");
check(aiQuestionsMd.includes("DeepSeek"), "AI search questions must include platform monitoring prompts.");
check(aiQuestionsMd.includes("豆包"), "AI search questions must include China AI platform prompts.");

check(roadmapMd.includes("# GBATC GEO and SEO Roadmap"), "Roadmap must include a clear title.");
check(roadmapMd.includes("## 30 Days"), "Roadmap must include a 30-day phase.");
check(roadmapMd.includes("## 60 Days"), "Roadmap must include a 60-day phase.");
check(roadmapMd.includes("## 90 Days"), "Roadmap must include a 90-day phase.");

check(homeHtml.includes(`<link rel="canonical" href="${HOME_URL}">`), "Homepage must include an absolute canonical URL.");
check(homeHtml.includes(`<meta property="og:url" content="${HOME_URL}">`), "Homepage must include an absolute og:url.");
check(homeHtml.includes(`<meta property="og:image" content="${HOME_URL}assets/gba-hero.png">`), "Homepage Open Graph image must be absolute.");
check(homeHtml.includes(`<meta name="twitter:image" content="${HOME_URL}assets/gba-hero.png">`), "Homepage Twitter image must be absolute.");
check(homeHtml.includes('id="faq"'), "Homepage must include a visible FAQ section for AI-extractable answers.");

const homeJsonLd = extractJsonLd(homeHtml, "index.html");
const organization = homeJsonLd.find((node) => node["@type"] === "Organization");
const website = homeJsonLd.find((node) => node["@type"] === "WebSite");
const webpage = homeJsonLd.find((node) => node["@type"] === "WebPage");
check(Boolean(organization), "Homepage JSON-LD must include Organization.");
check(Boolean(website), "Homepage JSON-LD must include WebSite.");
check(Boolean(webpage), "Homepage JSON-LD must include WebPage.");
check(organization?.url === HOME_URL, "Organization JSON-LD URL must be absolute and canonical.");
check(organization?.logo === `${HOME_URL}assets/gbatc-logo.svg`, "Organization logo URL must be absolute.");
check(website?.url === HOME_URL, "WebSite JSON-LD URL must be absolute and canonical.");
check(webpage?.url === HOME_URL, "WebPage JSON-LD URL must be absolute and canonical.");
check(hasJsonLdType(homeJsonLd, "FAQPage"), "Homepage JSON-LD must include FAQPage.");

check(eventHtml.includes(`<link rel="canonical" href="${EVENT_URL}">`), "Event page must include an absolute canonical URL.");
check(eventHtml.includes(`<meta property="og:url" content="${EVENT_URL}">`), "Event page must include an absolute og:url.");
check(eventHtml.includes(`<meta name="twitter:card" content="summary_large_image">`), "Event page must include Twitter card metadata.");
check(eventHtml.includes('id="faq"'), "Event page must include a visible FAQ section.");

const eventJsonLd = extractJsonLd(eventHtml, "events/dongguan-cdic-2026/index.html");
const eventNode = eventJsonLd.find((node) => node["@type"] === "Event");
check(Boolean(eventNode), "Event page JSON-LD must include Event.");
check(eventNode?.url === EVENT_URL, "Event JSON-LD URL must be absolute and canonical.");
check(eventNode?.startDate === "2026-09-09", "Event JSON-LD must include the known start date.");
check(eventNode?.endDate === "2026-09-10", "Event JSON-LD must include the known end date.");
check(hasJsonLdType(eventJsonLd, "BreadcrumbList"), "Event page JSON-LD must include BreadcrumbList.");
check(hasJsonLdType(eventJsonLd, "FAQPage"), "Event page JSON-LD must include FAQPage.");

if (failures.length > 0) {
  console.error(`GEO/SEO validation failed with ${failures.length} issue(s):`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("GEO/SEO validation passed.");
