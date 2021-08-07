import React,{useState,useEffect,useCallback} from 'react';
import {NavLink} from 'react-router-dom';
import "./GetFighters.css"

function GetFighters(){
    const [fighters,setFighters] = useState([]);

    useEffect(()=>{
        async function fetchFighters(){
            const response = await fetch(`/api/fighters`);
            const data = await response.json();
            return data
        }
        fetchFighters().then((data)=> setFighters(data))
    },[]);

    const returnFighters = (
        fighters?.map(fighter => {
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
            )
        })
    )


    return (
      <div className="card_table"> {returnFighters} </div>
    )

}
export default GetFighters;
