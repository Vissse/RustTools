import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/seo'

// Replaces the old Vite `seoAssets()` plugin robots.txt output.
//
// The AI crawlers are listed explicitly even though the wildcard group already
// allows everything. robots.txt matching is "most specific user-agent group
// wins, and only that group is read" — so the moment anyone adds a `Disallow`
// under `*` (a staging path, a query trap), every answer engine inherits it
// silently. Naming them keeps that accident from costing the site its citations.
//
// Three distinct jobs are covered, and they are not interchangeable:
//   - index/answer bots (OAI-SearchBot, PerplexityBot, Claude-SearchBot) build
//     the retrieval corpus these products cite from;
//   - user-triggered fetchers (ChatGPT-User, Perplexity-User, Claude-User) pull
//     a page live when someone asks about it;
//   - training/grounding agents (GPTBot, ClaudeBot, Google-Extended, CCBot,
//     Applebot-Extended, meta-externalagent) feed model and grounding corpora.
// Blocking the third group is a defensible product choice; blocking the first
// two removes the site from the answers entirely. All are allowed here.
const AI_CRAWLERS = [
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'ClaudeBot',
  'Claude-User',
  'Claude-SearchBot',
  'anthropic-ai',
  'PerplexityBot',
  'Perplexity-User',
  'Google-Extended',
  'Applebot-Extended',
  'meta-externalagent',
  'Amazonbot',
  'DuckAssistBot',
  'MistralAI-User',
  'cohere-ai',
  'YouBot',
  'CCBot',
]

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/' },
      { userAgent: AI_CRAWLERS, allow: '/' },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  }
}
