import type { CollectionEntry } from 'astro:content'

export interface PostEntry {
  post: CollectionEntry<'posts'>
}

export type PostModel = CollectionEntry<'posts'>
