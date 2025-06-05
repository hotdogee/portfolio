import type { ImageFunction } from 'astro:content'
import { defineCollection, z } from 'astro:content'
import { glob } from 'astro/loaders'
// Import utilities from `astro:content`
import { getContentEntryIdAndSlug } from 'node_modules/astro/dist/content/utils.js'
import certs from '@/certifications/certifications.json'
import orgs from '@/organizations/organizations.json'
import { slugify } from '@lib/i18n'

// Import the glob loader

// Define a `loader` and `schema` for each collection
// title: 'My First Blog Post'
// excerpt: 'This is the first post of my new Astro blog.'
// author: 'Astro Learner'
// image:
//   url: 'https://docs.astro.build/assets/rose.webp'
//   alt: 'The Astro logo on a dark background with a pink glow.'
// tags: ['astro', 'blogging', 'learning in public']
// changes:
//   - '2025-05-16': 'updated post'
//   - '2025-05-15': 'initial post'

// image() will expand the url string to and object
// image:
//   url: {
//     src: string;
//     width: number;
//     height: number;
//     format: "png" | "jpg" | "jpeg" | "tiff" | "webp" | "gif" | "svg" | "avif";
//   }
//   alt: 'The Astro logo on a dark background with a pink glow.'

const articles = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/articles' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      excerpt: z.string().optional(),
      author: z.string(),
      image: z
        .object({
          url: image(),
          alt: z.string(),
        })
        .optional(),
      categories: z.array(z.string()).optional(),
      tags: z.array(z.string()).optional(),
      draft: z.boolean().optional(),
      // published: z.date(), // computed from the changes
      // updated: z.date(), // computed from the changes
      changes: z.array(z.record(z.string(), z.string())),
      slug: z.string().optional(),
    }),
})

const projectLinkSchema = z.object({
  text: z.string(),
  url: z.string().url(),
  icon: z.string().optional(), // Assuming icon is a string identifier
  variant: z.string().optional(), // e.g., 'default', 'outline'
})

const sidebarDiagramCardSchema = (image: ImageFunction) =>
  z.object({
    type: z.literal('diagram'),
    title: z.string(),
    image: z.object({
      url: image(),
      alt: z.string(),
    }),
    caption: z.string(),
  })

const sidebarMetricsCardSchema = z.object({
  type: z.literal('metrics'),
  title: z.string(),
  metrics: z.array(
    z.object({
      label: z.string(),
      value: z.string(),
      percentage: z.number().optional(), // Assuming percentage is optional
    })
  ),
})

const sidebarListCardSchema = (image: ImageFunction) =>
  z.object({
    type: z.literal('list'),
    title: z.string(),
    items: z.array(
      z.object({
        icon: z.string().optional(),
        name: z.string(),
        description: z.string().optional(),
        url: z.string().optional(),
        image: z
          .object({
            url: image(),
            alt: z.string(),
          })
          .optional(),
      })
    ),
  })

const sidebarCardSchema = (image: ImageFunction) =>
  z.union([sidebarDiagramCardSchema(image), sidebarMetricsCardSchema, sidebarListCardSchema(image)])

type GlobOptions = Parameters<NonNullable<Parameters<typeof glob>[0]['generateId']>>[0]

const generateId = ({ entry, base, data }: GlobOptions): string => {
  if (data.slug) {
    return data.slug as string
  }
  const entryURL = new URL(encodeURI(entry), base)
  let { slug } = getContentEntryIdAndSlug({
    entry: entryURL,
    contentDir: base,
    collection: '',
  })
  // replace duplicate ending paths
  // e.g. "/tw/project-1/project-1" -> "/tw/project-1"
  const lastSegment = slug.split('/').pop()
  const secondLastSegment = slug.split('/').slice(-2, -1)[0]
  if (lastSegment === secondLastSegment) {
    slug = slug.slice(0, slug.length - lastSegment.length - 1)
  }
  return slug
}

const projects = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/projects', generateId }), // Adjusted pattern
  schema: ({ image }) =>
    z.object({
      slug: z.string().optional(),
      icon: image().optional(), // iconify icon name or local path
      color: z.string().optional(), // tailwind color class
      featured: z.number().optional(), // sorted descending
      categories: z.array(z.string()).optional(),
      tagline: z.string().optional(), // Marketing description
      title: z.string(), // Project Name
      subtitle: z.string().optional(), // Practical description
      description: z.string().optional(),
      image: z
        .object({
          url: image(),
          alt: z.string(),
        })
        .optional(),
      // description_paragraphs: z.array(z.string()).optional(),
      // features: z.array(z.string()).optional(),
      // impact_statement: z.string().optional(),
      // technical_details: z
      //   .object({
      //     title: z.string(),
      //     description: z.string().optional(),
      //     points: z.array(z.string()).optional(),
      //     conclusion: z.string().optional(),
      //   })
      //   .optional(),
      tech: z.array(z.string()).optional(),
      links: z.array(projectLinkSchema).optional(),
      cards: z.array(sidebarCardSchema(image)).optional(),
      // Optional: If you want to enforce draft status or publication dates
      draft: z.boolean().optional().default(false),
      // published: z.date(), // computed from the changes
      // updated: z.date(), // computed from the changes
      changes: z.array(z.record(z.string(), z.string())),
    }),
})

const certifications = defineCollection({
  loader: async () => {
    return certs.reduce(
      (acc, cert) => {
        const id = slugify(typeof cert.name === 'string' ? cert.name : cert.name.en)
        acc[id] = { ...cert, id }
        return acc
      },
      {} as Record<string, (typeof certs)[number] & { id: string }>
    )
  },
  schema: ({ image }) =>
    z.object({
      id: z.string().optional(),
      slug: z.string().optional(),
      featured: z.number().optional(), // sorted descending
      name: z.object({
        en: z.string(),
        tw: z.string(),
      }),
      organization: z.string(),
      issue: z.string().optional(),
      expire: z.string().optional(),
      identifier: z.string().optional(),
      description: z
        .object({
          en: z.array(z.string()).optional(),
          tw: z.array(z.string()).optional(),
        })
        .optional(),
      official: z.string().optional(),
      verify: z.string().optional(),
      skills: z.array(z.string()).optional(),
      badge: z
        .object({
          url: image(),
          alt: z.object({
            en: z.string(),
            tw: z.string(),
          }),
        })
        .optional(),
      certificate: z
        .object({
          url: image(),
          alt: z.object({
            en: z.string(),
            tw: z.string(),
          }),
        })
        .optional(),
      evidence: z
        .array(
          z.object({
            url: image(),
            alt: z.object({
              en: z.string(),
              tw: z.string(),
            }),
          })
        )
        .optional(),
    }),
})

const organizations = defineCollection({
  loader: async () => {
    return orgs
  },
  schema: ({ image }) =>
    z.object({
      // id: z.string().optional(),
      // name: z.object({
      //   en: z.string(),
      //   tw: z.string(),
      // }),
      name: z.string(),
      icon: z.object({
        light: image(),
        dark: image(),
        alt: z.string(),
      }),
      logo: z.object({
        light: image(),
        dark: image(),
        alt: z.string(),
      }),
    }),
})

// Export a single `collections` object to register your collection(s)
export const collections = { articles, projects, certifications, organizations }
