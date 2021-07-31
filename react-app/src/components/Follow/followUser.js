import React, {useState, useEffec} from "react";
import {useDispatch, useSelector} from "react-redux";
import {followUser} from "../../store/followers"


const FollowUser = ({featureObj}) => {
    const sessionUser = useSelector(state => state.session.user)
    const dispatch = useDispatch();

    let handleClick = (e) => {
        e.preventDefault();
        dispatch(followUser({sessionUser, featureObj}))
    }
    return(
        <div className="follow_user">
            <button onClick={handleClick}>Follow User</button>
        </div>
    )
}

export default FollowUser
