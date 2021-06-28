export const userAction = ( user ) =>{
    return {
        type: "USER",
        payload : { user }
    }
}

export const addProfile = ( friends ) =>{
    console.log("friends",friends)
    return {
        type: "UPDATE",
        payload: { friends }
    }
}

export const clearUserAction = () =>{
    return {
        type: "CLEAR",
        payload: null
    }
}