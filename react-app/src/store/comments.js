const GET_COMMENTS = 'GET_COMMENTS';


const getComments = (comments) => ({
    type: GET_COMMENTS,
    payload: comments
});



export const getFeatureComments = (featureObj) => async (dispatch) => {
    console.log("featureObj", featureObj)

    const response = await fetch(`/api/comments/${featureObj.type}/${featureObj.objId}/`)

    if (response.ok) {
        const comments = await response.json();
        console.log("Comments", comments)
        dispatch(getComments(comments));
    }
}

export const makeNewComment = (comment) => async (dispatch) => {
    let featureObj;

    if(comment.type !== "Comment"){
        featureObj = {
            type: comment.type,
            objId: comment.objId
        }
    } else{
        featureObj = {
            type: comment.parentObj,
            objId: comment.objId
        }
    }
    console.log("Make New Comment: comment", comment)


    const response = await fetch(`/api/comments/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(comment)
    });

    if (response.ok) {
        if(comment.type === "User"){
            dispatch(getFeatureComments(featureObj));
        }
    }


    // if (response.ok) {
    //     const comment = await response.json();
    //     console.log("Make New Comment: response", comment)
    //     dispatch( getFeatureComments(featureObj));

    // }
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
        dispatch( getFeatureComments(featureObj));
    }
}

export const editOneComment = (comment) => async (dispatch) => {
    let featureObj
    if(comment.type !== "Comment"){
        featureObj = {
            type: comment.type,
            objId: comment.objId
        }
    } else{
        featureObj = {
            type: comment.parentObj,
            objId: comment.parentId
        }
    }

    const response = await fetch(`/api/comments/${comment.id}/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(comment)
    });
    if (response.ok) {
        const comment = await response.json();
        dispatch(getFeatureComments(featureObj));
    }
}

const initialState = {}

const commentReducer = (state = initialState , action) => {
    switch (action.type) {
        case GET_COMMENTS:
            let newState = {
                ...state,
                ...action.payload
            }
            return newState;

        default:
            return state;
    }
}

export default commentReducer;
