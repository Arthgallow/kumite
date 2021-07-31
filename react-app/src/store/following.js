const GET_USER_FOLLOWING = 'GET_USER_FOLLOWING';

const getFollowing = (following) => ({
    type: GET_USER_FOLLOWING,
    payload: following
});

export const getUsersFollowed= (featureObj) => async(dispatch) => {
    const response = await fetch(`/api/follows/following/${featureObj.objId}/`)

    if (response.status) {
    const data = await response.json();
    dispatch(getFollowing(data));
    }
}


let initialState = {}

const followingReducer = (state = initialState , action) => {
    switch (action.type) {
        case GET_USER_FOLLOWING:
            return action.payload

        default:
            return state;
    }
}

export default followingReducer;
