/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_PAYPAL_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
