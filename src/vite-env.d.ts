/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_BASE_URL: string
    readonly VITE_BACKEND_URL: string
    readonly VITE_SERVER_URL: string
    readonly VITE_USING_LOCAL_KEYCLOAK?: string
}

interface ImportMeta {

    readonly env: ImportMetaEnv

    readonly PROD: boolean

    readonly MODE: string

}