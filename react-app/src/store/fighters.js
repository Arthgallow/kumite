const GET_FIGHTERS = 'GET_FIGHTERS';

const returnFighters = (fighters) => {
  return {
    type: GET_FIGHTERS,
    payload:fighters,
  };
}


export const getFighters = () => async (dispatch) => {
    const response = await fetch(`/api/fighters`);
    if(response.ok){
       const data = await response.json();
       console.log("Fighters", data);
       dispatch(returnFighters(data));
       return data
    }
}


export default function fighterReducer(state = {}, action) {
  switch (action.type) {
    case GET_FIGHTERS:
      return action.payload;
    default:
      return state;
  }
}
