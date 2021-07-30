const GET_COMMENTS = 'GET_COMMENTS';
const GET_FEATURE_COMMENTS = 'GET_FEATURE_COMMENTS';
const REMOVE_COMMENT = 'REMOVE_COMMENT';
const ADD_COMMENT = 'ADD_COMMENT';
const UPDATE_COMMENT = 'UPDATE_COMMENT';

const getComments = (comments) => ({
    type: GET_COMMENTS,
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

export const getFeatureComments = (featureObj) => async (dispatch) => {
    console.log("Obj Type", featureObj);
    console.log("Obj Id", featureObj.objId)

    const response = await fetch(`/api/comments/${featureObj.type}/${featureObj.objId}/`)


    if (response.ok) {
        console.log('Successfully fetched comments', response);
        const comments = await response.json();
        console.log('Successfully fetched comments', comments);

        dispatch(getComments(comments));
    }
}

export const makeNewComment = (comment) => async (dispatch) => {
    let featureObj = {
        type: comment.type,
        objId: comment.objId
    }

    const response = await fetch(`/api/comments/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(comment)
    });
    if (response.ok) {
        const comment = await response.json();
        console.log("COMMENT", featureObj)

        dispatch( getFeatureComments(featureObj));
    }
}

export const deleteComment = (comment) => async (dispatch) => {
    let featureObj = {
        type: comment.type,
        objId: comment.objId
    }
    const response = await fetch(`/api/comments/${parseInt(comment.id)}/`, {
        method: 'DELETE'
    });
    if (response.ok) {
        const comment = await response.json();
        console.log("COMMENT", featureObj)

        dispatch( getFeatureComments(featureObj));
    }
}

export const editOneComment = (comment) => async (dispatch) => {
    let featureObj = {
        type: comment.type,
        objId: comment.objId
    }
    console.log("Comment", comment)
    const response = await fetch(`/api/comments/${comment.id}/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(comment)
    });
    if (response.ok) {
        const comment = await response.json();
        console.log("COMMENT", comment)
        console.log("Feature Obj", featureObj)

        dispatch(getFeatureComments(featureObj));
    }
}

const initialState = {}

const commentReducer = (state = initialState , action) => {
    switch (action.type) {
        case GET_COMMENTS:
            return action.payload;
        case GET_FEATURE_COMMENTS:
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
