const initialState = null

 const reducer = (state = initialState, action) => {
    if(action.type == "USER")
    return action.payload
    if(action.type == "CLEAR")
    return null
    return state;
}

export default reducer