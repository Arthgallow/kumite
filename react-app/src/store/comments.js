const GET_COMMENTS = 'GET_COMMENTS';
const GET_USER_COMMENTS = 'GET_USER_COMMENTS';
const REMOVE_COMMENT = 'REMOVE_COMMENT';
const ADD_COMMENT = 'ADD_COMMENT';
const UPDATE_COMMENT = 'UPDATE_COMMENT';

const getComments = (objId) => ({
    type: GET_COMMENTS,
    payload: objId
});
const getOneUserComments = (comments) => ({
    type: GET_USER_COMMENTS,
    payload: comments
});
const removeComment = (commentId) => ({
    type: REMOVE_COMMENT,
    payload: commentId
});
const updateComment = (comment) => ({
    type: UPDATE_COMMENT,
    payload: comment
});
const addComment = (comment) => ({
    type: ADD_COMMENT,
    payload: comment
});

export const getUserComments = (user_id) => async (dispatch) => {
    const response = await fetch(`/api/comments/users/${user_id}`);

    if (response.ok) {
        const comments = await response.json();
        dispatch(getOneUserComments(comments));
    }
}

export const newComment = (comment, objId) => async (dispatch) => {
    console.log("COMMENT", comment)
    const {user_id, description } = comment;


    const response = await fetch(`/api/comments/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({user_id, description })
    });
    console.log("RES" ,response)
    if (response.ok) {
        const comment = await response.json();
        dispatch( getComments(objId));
    }
}

export const deleteComment = (commentId) => async (dispatch) => {
    const response = await fetch(`/api/comments/${commentId}`, {
        method: 'DELETE'
    });
    if (response.ok) {
        dispatch(removeComment(commentId));
    }
}

const initialState = {}

const commentReducer = (state = initialState , action) => {
    switch (action.type) {
        case GET_COMMENTS:
            return action.payload;
        case GET_USER_COMMENTS:
            return action.payload;
        case REMOVE_COMMENT:
            return {
                ...state,
                [action.payload]: undefined
            };
        case ADD_COMMENT:
            return {
                ...state,
                [action.payload.id]: action.payload
            };
        // case UPDATE_COMMENT:
        //     return {
        //         ...state,
        //         [action.payload.id]: action.payload
        //     };
        default:
            return state;
    }
}

export default commentReducer;
