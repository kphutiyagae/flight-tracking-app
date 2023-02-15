import axios from "axios";

const config = {
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'text/json',
      }
}

const baseUrl = "http://opensky-network.org/api";


async function getAllStates(){
  return await fetch(`${baseUrl}/states/all?extended=1`)
              .then( (res) => res.json())
              .then( (data) => {
                return data.states;
              })
}

//Make use of observable.

export {getAllStates}
