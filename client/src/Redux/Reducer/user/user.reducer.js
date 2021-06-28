const initialState = null

 const reducer = (state = initialState, action) => {
    if(action.type == "USER")
    return action.payload
    if(action.type == "CLEAR")
    return null
    if(action.type=="UPDATE")
    {
        console.log("State",state)
        return {
        ...state,
        friends:action.payload
        }
    }

    return state;
}

export default reducer