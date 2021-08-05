import React, {useState, useEffec} from "react";
import {useDispatch, useSelector} from "react-redux";
import {unfollowUser} from "../../store/followers"
import "./unfollowBtn.css"


const UnfollowUser = ({featureObj}) => {
    const sessionUser = useSelector(state => state.session.user)
    const dispatch = useDispatch();

    let handleClick = (e) => {
        e.preventDefault();
        dispatch(unfollowUser({sessionUser, featureObj}))
    }
    return(
        <div className="followUser">
            <button className="unfollow_btn" onClick={handleClick}>UnFollow User</button>
        </div>
    )
}

export default UnfollowUser
