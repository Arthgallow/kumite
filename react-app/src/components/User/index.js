import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import NewComment from '../Comment/newComment';
import GetComments from '../Comment/getComments';
import GetFollowers from '../Follow/getFollowers';
import FollowUser from '../Follow/followUser';
import UnFollowUser from '../Follow/unFollowUser';
import GetFollowing from '../Follow/getFollowing';
import GetFighters from '../GetFighters/getFighters';
import "./UserPage.css"

function User() {
  const [user, setUser] = useState({});
  const { userId }  = useParams();
  let featureObj;
  if(user){
    featureObj = {type: 'User',
    objId: parseInt(userId, 10)}
  }

  useEffect(() => {
    if (!userId) {
      return;
    }
    (async () => {
      const response = await fetch(`/api/users/${userId}`);
      const user = await response.json();
      setUser(user);
    })();


  }, [userId,  GetFollowing]);

  if (!user) {
    return null;
  }
  console.log("User", user)


  return (
    <div className="user_page_container_bord">
      <div className="user_page_container_left_top">
        <div className="image_container">
          <img src={user.user_image} alt="user image" className="user_image" />
        </div>
        <div className="button_container">
          <FollowUser featureObj={featureObj} className="follow_button"/>
          <UnFollowUser featureObj={featureObj} className="unfollow_button"/>
        </div>
      </div>
      <div className="user_page_container_left_bottom">
        <GetFollowing className="get_following" featureObj={featureObj} />
        <GetFollowers className="get_followers" featureObj={featureObj} />

      </div>
      <div className="user_page_container_right_top">
        <div className="user_page_container_right_top_name">
          <h1 className="user_full_name">{user.first_name} {user.last_name}</h1>
        </div>

      </div>
      <div className="user_page_container_right_bottom">
        <GetComments featureObj={featureObj} />
      </div>
    </div>
  );
}
export default User;
