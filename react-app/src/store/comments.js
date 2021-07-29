const GET_COMMENTS = 'GET_COMMENTS';
const GET_USER_COMMENTS = 'GET_USER_COMMENTS';
const REMOVE_COMMENT = 'REMOVE_COMMENT';
const ADD_COMMENT = 'ADD_COMMENT';
const UPDATE_COMMENT = 'UPDATE_COMMENT';

const getComments = (comments) => ({
    type: GET_COMMENTS,
    payload: comments
});
const getOneUserComments = (comments) => ({
    type: GET_USER_COMMENTS,
    payload: comments
});
const removeComment = (commentId) => ({
    type: REMOVE_COMMENT,
    payload: commentId
});
const addComment = (comment) => ({
    type: ADD_COMMENT,
    payload: comment
});
const updateComment = (comment) => ({
    type: UPDATE_COMMENT,
    payload: comment
});

export const getUserComments = (userId) => async (dispatch) => {
    console.log("BAAAA", userId);

    const response = await fetch(`/api/comments/users/${parseInt(userId)}`);
    console.log("res", response);

    if (response.ok) {
        const comments = await response.json();
        dispatch(getOneUserComments(comments));
    }
}

const initialState = {}

const commentReducer = (state = initialState , action) => {
    switch (action.type) {
        case GET_COMMENTS:
            return action.payload;
        case GET_USER_COMMENTS:
            return action.payload;
        // case REMOVE_COMMENT:
        //     return {
        //         ...state,
        //         [action.payload]: undefined
        //     };
        // case ADD_COMMENT:
        //     return {
        //         ...state,
        //         [action.payload.id]: action.payload
        //     };
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
