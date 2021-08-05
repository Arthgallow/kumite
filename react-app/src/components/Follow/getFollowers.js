import React, { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom'
import  {getUsersFollowers} from '../../store/followers'
import './follower.css'


const GetFollowers = ({featureObj}) => {
    const dispatch = useDispatch();
    const sessionFollowers = useSelector(state => state.followers);
    console.log("Session Followers" , sessionFollowers);

    let followers= [];
    for( const [key, value] in Object.entries(sessionFollowers) ) {
        followers.push(
            <Link className="follower_link" to={`/users/${sessionFollowers[key].id}`}>
                <img className="follower_img" src={sessionFollowers[key].user_image}  alt={sessionFollowers[key].name} />
                <h2 className="follower_name">{sessionFollowers[key].username}</h2>
            </Link>
        )
    }

    useEffect(async() => {
        await dispatch(getUsersFollowers(featureObj))
    }, [dispatch, featureObj])

    return(
        <div className="followers_bord">
            <div className="followers_title">FOLLOWERS</div>
            <div className="followers_list">
                {followers}
            </div>
        </div>
    )
}

export default GetFollowers;
