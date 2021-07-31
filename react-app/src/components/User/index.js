import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import NewComment from '../Comment/newComment';
import GetComments from '../Comment/getComments';
import GetFollowers from '../Follow/getFollowers';
import FollowUser from '../Follow/followUser';
import UnFollowUser from '../Follow/unFollowUser';
import GetFollowing from '../Follow/getFollowing';

function User() {
  const [user, setUser] = useState({});
  const { userId }  = useParams();
  let featureObj;

  useEffect(() => {
    if (!userId) {
      return;
    }
    (async () => {
      const response = await fetch(`/api/users/${userId}`);
      const user = await response.json();
      setUser(user);
    })();
  }, [userId]);

  if (!user) {
    return null;
  }
  if(user){
    featureObj = {type: 'User',
    objId: parseInt(userId, 10)}
  }

  console.log("User", parseInt(userId))


  return (
    <ul>
      <li>
        <strong>User Id</strong> {userId}
      </li>
      <li>
        <strong>Username</strong> {user.username}
      </li>
      <li>
        <strong>Email</strong> {user.email}
      </li>
      <li>
        <strong>Comments</strong>
        <NewComment featureObj={featureObj} />
        <GetComments featureObj={featureObj} />
        <GetFollowers featureObj={featureObj} />
        <FollowUser featureObj={featureObj} />
        <UnFollowUser featureObj={featureObj} />
        <GetFollowing featureObj={featureObj} />
      </li>
    </ul>
  );
}
export default User;
