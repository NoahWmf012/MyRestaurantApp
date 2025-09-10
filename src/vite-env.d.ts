/// <reference types="vite/client" />

interface ImportMetaEnv {

    readonly REACT_APP_BASE_URL: string

    readonly REACT_APP_TLB_URL: string

    readonly REACT_APP_USING_LOCAL_KEYCLOAK: string

}

interface ImportMeta {

    readonly env: ImportMetaEnv

    readonly PROD: boolean

    readonly MODE: string

}