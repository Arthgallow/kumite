import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

function UsersList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/api/users/');
      const responseData = await response.json()
      console.log(responseData);
      setUsers(responseData);
    }
    fetchData();
  }, []);
    let returnFighters

   returnFighters = (
    users?.map(fighter => {
      let user = {...fighter[0], ...fighter[1]}
      console.log("CURRNET USER", user)

      return (

        <NavLink key={user.id} to={`/users/${user.id}`} className="fighter_card_container">
          <div className="fighter_card_inner">
              <div className="fighter_card_front">
                  <div className="fighter_card_front_top" >
                      <img src={user.user_image} className="fighter_card_front_img" />

                  </div>
                  <div className="fighter_card_front_bottom">
                      <div className="fighter_card_front_info">
                          <h1 className="fighter_card_front_name">
                              {user.first_name} {user.last_name}
                          </h1>

                              <p className="lazy_words">Style: {user.fighting_style}</p>
                              <p className="lazy_words">Record :
                          <p className="lazy_words">{user.fighter_wins} : {user.fighter_losses} </p>
                          </p>

                      </div>

                  </div>

              </div>
              <div className="fighter_card_back">
                <div className="fighter_card_back_name">
                  <h1 > {user.fighter_titles} </h1>
                  <div className="lazy_words">Height:{user.fighter_height}in.</div>
                  <div className="lazy_words">Weight:{user.fighter_weight}lb.</div>
                  <div className="lazy_words">Reach:{user.fighter_reach}in.</div>
                  <div className="lazy_words">Age:{user.fighter_age}</div>
                </div>
            </div>
          </div>
        </NavLink>
      );
})
)

return (
<div className="card_table"> {returnFighters} </div>


)



  // console.log("Users", users);

  // const userComponents = users.map((user) => {
  //   return (
  //     <li key={user.id}>
  //       <NavLink to={`/users/${user.id}`}>{user.username}</NavLink>
  //     </li>
  //   );
  // });

  // return (
  //   <>
  //     <h1>User List: </h1>
  //     <ul>{userComponents}</ul>
  //   </>
  // );
}

export default UsersList;
