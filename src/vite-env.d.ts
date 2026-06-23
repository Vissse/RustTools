/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** PostHog project API key. Analytics is disabled when unset. */
  readonly VITE_POSTHOG_KEY?: string
  /** PostHog API host. Defaults to the EU cloud when unset. */
  readonly VITE_POSTHOG_HOST?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
