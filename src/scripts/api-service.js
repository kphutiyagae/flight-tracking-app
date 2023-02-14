import axios from "axios";

const config = {
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'text/json',
      }
}

const baseUrl = "http://opensky-network.org/api";

/*
async function getAllStates() {
  fetch(`${baseUrl}/states/all`)
  .then((response) => response.json())
  .then((data) => console.log(data))
}

async function getAircraft(flight_id) {
  fetch(`${baseUrl}/states/all`)
  .then((response) => response.json())
  .then((data) => console.log(data))
}

async function getFlightsInRange(begin,end) {
  fetch(`${baseUrl}/states/all`)
  .then((response) => response.json())
  .then((data) => console.log(data))
}

export {testFunct, getAllStates}
*/