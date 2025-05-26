import rss from '@astrojs/rss'
import { datesFromChanges } from '@lib/utils'
import type { APIRoute } from 'astro'
import { getCollection } from 'astro:content'

export const GET: APIRoute = async ({ site }) => {
  const articles = await getCollection('articles')
  return rss({
    title: 'Han Lin',
    description: 'Random thoughts and ideas',
    site: site as URL,
    items: articles.map((article) => {
      const { published, updated } = datesFromChanges(article.data.changes)
      return {
        title: article.data.title,
        pubDate: updated || published || undefined,
        description: article.data.excerpt,
        link: `/articles/${article.id}/`,
      }
    }),
    customData: `<language>en-us</language>`,
  })
}
