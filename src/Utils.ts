export function isDev(){
    return process.env.NODE_ENV === "development"
}

export const backPath = "/pixel-battle-back"

export function getHomepage(){
    return process.env.PUBLIC_URL
}

export function getLoginFormUrl(){
    const host = getBackHost();
    const idpUrl = "/oauth2"
    const loginFormPath = "/login"
    const getRedirTo = isDev() ? getFrontUrl() :  ("/"+getHomepage())
    return `${host}/oauth2${loginFormPath}?redirect=${encodeURIComponent(getRedirTo)}`
}

export function getFrontUrl(){
    return getBackHost() + "/" + getHomepage()
}

function getDcEnv(){
    return window['dc_env']
}

export function getBackHost(){
    return getDcEnv().backHost;
}
export function getBackPath(){
    return getDcEnv().backPath
}
export function getBackUrl(){
    return getBackHost() + getBackPath()
}