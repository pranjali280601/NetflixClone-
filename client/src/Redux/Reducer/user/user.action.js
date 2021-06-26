export const userAction = ( {user} ) =>{
    return {
        type: "USER",
        payload : {user}
    }
}

export const clearUserAction = () =>{
    return {
        type: "CLEAR",
        payload: null
    }
}