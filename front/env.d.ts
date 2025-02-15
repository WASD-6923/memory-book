interface ImportMetaEnv {
  VITE_APP_BASE: string
  VITE_APP_BASE_GRAPHQL: string
  VITE_APP_BASE_API: string
  VITE_APP_HOST: string

  VITE_APP_FRONT: string

  VITE_PUSHER_APP_KEY: string
  VITE_PUSHER_APP_CLUSTER: string

  VITE_REVERB_APP_ID: string
  VITE_REVERB_APP_KEY: string
  VITE_REVERB_APP_SECRET: string
  VITE_REVERB_HOST: string
  VITE_REVERB_PORT: number
  VITE_DEFAULT_LOCALE: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
