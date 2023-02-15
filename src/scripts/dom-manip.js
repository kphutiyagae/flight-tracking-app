
let flightClass = new Map();
flightClass.set(0, "N/A");
flightClass.set(1, "No ADS-B Info");
flightClass.set(2, "Light");
flightClass.set(3, "Small");
flightClass.set(4, "Large");
flightClass.set(5, "High Vortex Large");
flightClass.set(6, "Heavy");
flightClass.set(7, "High Performance");
flightClass.set(8, "Rotorcraft");
flightClass.set(9, "Glider");
flightClass.set(10, "Lighter-than-air");
flightClass.set(11, "Parachutist");
flightClass.set(12, "Ultralight");
flightClass.set(13, "Reserved");
flightClass.set(14, "U.A.V");
flightClass.set(15, "Trans-atmospheric");
flightClass.set(16, "Surf. Veh. - Emergency");
flightClass.set(17, "Surf. Veh. - Service");
flightClass.set(18, "Point Obstacle");
flightClass.set(19, "Cluster Obstacle");
flightClass.set(20, "Line Obstacle");

function getClass(i){
    return flightClass.get(i);
}

function createListItem(stateVector){

    if(stateVector !== null){
    
        const list_component = document.getElementById("container__list-component");
 
        const node = document.createElement("div");
        
        node.dataset.id = `${stateVector[0]}`;

        node.dataset.lat = `${stateVector[6]}`;

        node.dataset.long = `${stateVector[5]}`;

        node.classList ='list-component__item';

        node.innerHTML = `<h3> ${stateVector[1] ?? 'Unavailable'}</h3>\n
        <p> ${stateVector[2]} </p>\n
        <p> ${ flightClass.get(parseInt(stateVector[17]))} </p>\n
        </div>`;

        return node;
    }
}

function populateListComponent(statesVector, startIndex, endIndex){
    const list_component = document.getElementById("container__list-component");
    
    const flightsArray = statesVector.slice(startIndex, endIndex);

    flightsArray.map( (flight) => {
        if( flight[6] & flight[5]){}
        list_component.appendChild( createListItem(flight) );
    });
}

function onItemClick(){}

export {createListItem, populateListComponent, getClass}
