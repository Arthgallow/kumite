const SET_COMMENT = 'SET_COMMENT';
const SET_ID = 'SET_ID';

const setNewCommentStatus = (status)=>({
    type: 'SET_COMMENT',
    payload: status
})
const setCommentId= (commentId)=>({
    type: 'SET_ID',
    payload: commentId
})

export const setComment=(status)=>(dispatch)=>{
    console.log("Status", status)

    dispatch(setNewCommentStatus(status));
    return null
}

export const setId=(commentId)=>(dispatch)=>{
    console.log("comment id", commentId)
    dispatch(setCommentId(commentId));
    return null
}

let initialState = {'status':false};

const  replyReducer = (state = initialState, action) => {
    let newState;
    console.log("SET Comment", state)

    switch (action.type) {
        case SET_COMMENT:
            newState = {...state}
            newState['status'] = action.payload;
            return newState;
        case SET_ID:
            console.log("Action", action.type)
            newState = {...state}
            newState['commentId'] = action.payload
            return newState;
        default:
            return state;
    }
}

export default replyReducer;
