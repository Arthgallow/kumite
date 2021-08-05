const GET_USER_FOLLOWERS = 'GET_USER_FOLLOWERS';

const getFollowers = (followers) => ({
    type: GET_USER_FOLLOWERS,
    payload: followers
});


export const getUsersFollowers= (featureObj) => async(dispatch) => {
    const response = await fetch(`/api/follows/${featureObj.type}/${featureObj.objId}/`)
    const data = await response.json();

    if(response.ok){
        dispatch(getFollowers(data));
    }

};

export const followUser = ({featureObj, sessionUser}) => async(dispatch) => {
    const response = await fetch(`/api/follows/${featureObj.type}/${featureObj.objId}/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({sessionUser : sessionUser.id})
    })
    if(response.ok){
        const data = await response.json()
        getUsersFollowers(featureObj)
    }
}
export const unfollowUser= ({featureObj, sessionUser}) => async(dispatch) => {
    const response = await fetch(`/api/follows/${featureObj.type}/${featureObj.objId}/`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({sessionUser : sessionUser.id})
    })
    if(response.ok){
        const data= await response.json()
        getUsersFollowers(featureObj)
    }
}

let initialState = {}

const followerReducer = (state = initialState , action) => {
    switch (action.type) {
        case GET_USER_FOLLOWERS:
            let res ={
                ...action.payload
            }
            return res
        default:
            return state;
    }
}

export default followerReducer;
