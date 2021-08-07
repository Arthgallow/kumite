import React, { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom'
import  {getUsersFollowers} from '../../store/followers'
import './follower.css'


const GetFollowers = ({featureObj}) => {
    const dispatch = useDispatch();
    const sessionFollowers = useSelector(state => state.followers);
    let x = 0
    let followers= [];
    for( const [key, value] in Object.entries(sessionFollowers) ) {
        followers.push(
            <Link key={x+=1} className="follower_link" to={`/users/${sessionFollowers[key].id}`}>
                <img className="follower_img" src={sessionFollowers[key].user_image}  alt={sessionFollowers[key].name} />
                <h2 className="follower_name">{sessionFollowers[key].username}</h2>
            </Link>
        )
    }

    useEffect(async() => {
        await dispatch(getUsersFollowers(featureObj))
    }, [dispatch, featureObj])

    return(
        <div className="follower_bord">
            <div className="follower_title">FOLLOWERS</div>
            <div className="follower_list">
                {followers}
            </div>
        </div>
    )
}

export default GetFollowers;
