/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly SANKHYA_ANALYTICS_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
