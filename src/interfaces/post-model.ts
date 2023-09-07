import type { CollectionEntry } from 'astro:content'

export type PostModel = CollectionEntry<'posts'> | CollectionEntry<'notes'>

export type PostMatter = CollectionEntry<'posts'>['data'] | CollectionEntry<'notes'>['data']
