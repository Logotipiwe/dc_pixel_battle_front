export function isDev(){
    return process.env.NODE_ENV === "development"
}

export const backPath = "/pixel-battle-back"

export function getBackUrl(){
    if(isDev()){
        return "http://localhost" + backPath
    } else {
        return backPath
    }
}