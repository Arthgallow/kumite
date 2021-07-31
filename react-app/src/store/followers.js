const GET_USER_FOLLOWERS = 'GET_USER_FOLLOWERS';

const getFollowers = (followers) => ({
    type: GET_USER_FOLLOWERS,
    payload: followers
});


export const getUsersFollowers= (featureObj) => async(dispatch) => {
    console.log("FEATURE", featureObj);
    const response = await fetch(`/api/follows/${featureObj.type}/${featureObj.objId}/`)
    const data = await response.json();
    console.log(data);

    if(response.ok){
        dispatch(getFollowers(data));
    }

};

export const followUser = ({featureObj, sessionUser}) => async(dispatch) => {
    console.log("FEATURE", featureObj, sessionUser);
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
    console.log("FEATURE", featureObj, sessionUser);
    const response = await fetch(`/api/follows/${featureObj.type}/${featureObj.objId}/`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({sessionUser : sessionUser.id})
    })
    if(response.ok){
        const data= await response.json()
        console.log("DATA", data);
        getUsersFollowers(featureObj)
    }
}

let initialState = {}

const followerReducer = (state = initialState , action) => {
    switch (action.type) {
        case GET_USER_FOLLOWERS:
            console.log(action.payload)
            let res ={
                ...action.payload
            }
            return res
        default:
            return state;
    }
}

export default followerReducer;
