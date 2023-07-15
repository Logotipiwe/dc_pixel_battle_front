export function isDev(){
    return process.env.NODE_ENV === "development"
}

export function getHomepage(){
    return process.env.PUBLIC_URL
}

export function getLoginFormUrl(){
    const host = getBackHost();
    const idpUrl = "/oauth2"
    const loginFormPath = "/login"
    const getRedirTo = getFrontUrl()
    return `${host}${idpUrl}${loginFormPath}?redirect=${encodeURIComponent(getRedirTo)}`
}

export function getFrontUrl(){
    return getFrontHost() + "/" + getHomepage()
}

function getDcEnv(){
    return window['dc_env']
}

export function getIdpUrl(){
    debugger
    return getDcEnv().idpUrl
}

export function getBackHost(){
    return getDcEnv().backHost;
}
export function getFrontHost(){
    return getDcEnv().frontHost;
}
export function getBackPath(){
    let backPath = getDcEnv().backPath;
    console.log("back path is " + backPath)
    console.log("dc env"  + JSON.stringify(getDcEnv()))
    return backPath
}
export function getBackUrl(){
    return getBackHost() + getBackPath()
}

const handleUnauthorized = response => {
    if(response.status === 403){
        window.location.href = getLoginFormUrl()
    }
    return response
};

export function doFetch(url: RequestInfo | URL, data?: RequestInit){
    return fetch(url, data).then(handleUnauthorized)
}

export function doFetchJson(url: RequestInfo | URL, data?: RequestInit){
    return fetch(url, data).then(handleUnauthorized)
        .then(res=>{
            return res.json()
        })
}