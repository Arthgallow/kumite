import React, { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom'
import  {getUsersFollowed} from '../../store/following'
import "./following.css"

const GetFollowed = ({featureObj}) => {
    const dispatch = useDispatch();
    const sessionFollowing = useSelector(state => state.following);
    let x = 0
    let following= [];
    for( const [key, value] in Object.entries(sessionFollowing) ) {

        following.push(
            <Link style={{textDecoration:"none"}} key={x+=1} className="following_link" to={`/users/${sessionFollowing[key].id}`}>
                <img className="following_img" src={sessionFollowing[key].user_image} alt={sessionFollowing[key].name} />
                <h2 className="following_name">{sessionFollowing[key].username}</h2>
            </Link>
        )

    }

    useEffect(async() => {
        await dispatch(getUsersFollowed(featureObj))
    }, [dispatch, featureObj])

    return(
        <div className="following_bord">
            <div className="following_title">FOLLOWING</div>
            <div className="following_list">
                {following}
            </div>
        </div>
    )
}

export default GetFollowed;
