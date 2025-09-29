export const getAppBaseUrl = () => {
    let url = import.meta.env.VITE_BASE_URL || '/'
    if (!url.endsWith('/')) {
        url = `${url}/`
    }
    if (!url.startsWith('/')) {
        url = `/${url}`
    }
    return url
}

export const getBackendUrl = () => {
    let url = import.meta.env.VITE_BACKEND_URL || '/'
    if (!url.endsWith('/')) {
        url = `${url}/`
    }
    if (!url.startsWith('/')) {
        url = `/${url}`
    }
    return url
}