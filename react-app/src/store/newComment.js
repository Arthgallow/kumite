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

    dispatch(setNewCommentStatus(status));
    return null
}

export const setId=(commentId)=>(dispatch)=>{
    dispatch(setCommentId(commentId));
    return null
}

let initialState = {'status':false};

const  replyReducer = (state = initialState, action) => {
    let newState;

    switch (action.type) {
        case SET_COMMENT:
            newState = {...state}
            newState['status'] = action.payload;
            return newState;
        case SET_ID:
            newState = {...state}
            newState['commentId'] = action.payload
            return newState;
        default:
            return state;
    }
}

export default replyReducer;
