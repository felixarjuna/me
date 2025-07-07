import { defineCollection, defineConfig } from '@content-collections/core';
import { compileMDX } from '@content-collections/mdx';
import {
  type RehypeCodeOptions,
  rehypeCode,
  remarkGfm,
  remarkHeading,
} from 'fumadocs-core/mdx-plugins';
import readingTime from 'reading-time';

const rehypeCodeOptions: RehypeCodeOptions = {
  themes: {
    light: 'github-light',
    dark: 'github-dark-default',
  },
};

// for more information on configuration, visit:
// https://www.content-collections.dev/docs/configuration

const pages = defineCollection({
  name: 'pages',
  directory: 'content',
  include: 'pages/*.mdx',
  schema: (z) => ({
    title: z.string(),
    description: z.string(),
  }),
  transform: async (page, context) => {
    const body = await compileMDX(context, page, {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [[rehypeCode, rehypeCodeOptions], remarkHeading],
    });

    return {
      ...page,
      body,
      _meta: {
        ...page._meta,
        path: page._meta.path.replace(/\\/g, '/'),
      },
    };
  },
});

const posts = defineCollection({
  name: 'posts',
  directory: 'content',
  include: 'blog/*.mdx',
  schema: (z) => ({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    image: z.string().optional(),
  }),
  transform: async (page, context) => {
    const body = await compileMDX(context, page, {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [[rehypeCode, rehypeCodeOptions], remarkHeading],
    });

    const normalizedPath = page._meta.path.replace(/\\/g, '/');

    return {
      ...page,
      date: new Date(page.date),
      body,
      slug: normalizedPath,
      readingTime: readingTime(page.content).text,
      _meta: {
        ...page._meta,
        path: normalizedPath,
      },
    };
  },
});

export default defineConfig({
  collections: [pages, posts],
});
