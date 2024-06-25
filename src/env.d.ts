/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />
/// <reference types="vite-plugin-pwa/client" />
/// <reference types="vite-plugin-pwa/info" />

declare module '@pagefind/default-ui' {
  declare class PagefindUI {
    constructor(arg: any)
  }
}
