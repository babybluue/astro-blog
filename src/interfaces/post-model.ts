import type { CollectionEntry } from 'astro:content'

export type PostModel = CollectionEntry<'posts'>

export type PostMatter = CollectionEntry<'posts'>['data']
