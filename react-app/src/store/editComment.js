const SET_COMMENT = 'SET_COMMENT';
const SET_ID = 'SET_ID';

const setEditCommentStatus = (status)=>({
    type: 'SET_COMMENT',
    payload: status
})
const setCommentId= (commentId)=>({
    type: 'SET_ID',
    payload: commentId
})

export const setEditComment=(status)=>(dispatch)=>{

    dispatch(setEditCommentStatus(status));
    return null
}

export const setEditId=(commentId)=>(dispatch)=>{
    console.log("comment id", commentId)
    dispatch(setCommentId(commentId));
    return null
}

let initialState = {'status':false};

const  editReducer = (state = initialState, action) => {
    let newState;

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

export default editReducer;
