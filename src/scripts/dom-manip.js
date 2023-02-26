import { moveToFlight } from "./map-service";

const flightClass = new Map();
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

const flightFilterOptions = {
	originCountry: null,
	flightStatus: null,
	flightCategory: null,
};

function getClass(i) {
	return flightClass.get(i);
}

function createFlight(flightsArray) {
	if (flightsArray && flightsArray.length) {
		const list_component = document.getElementById("container__list-component");

		const node = document.createElement("div");

		node.dataset.id = `${flightsArray[0]}`;

		node.dataset.lat = `${flightsArray[6]}`;

		node.dataset.long = `${flightsArray[5]}`;

		node.classList =
			"list-component__item bg-secondary-theme-color pt-4 m-1 pb-3.5 rounded-md cursor-pointer";

		node.onclick = (event) => onFlightClick(event);

		node.innerHTML = `<h3 class="text-3xl ml-6 mb-5 text-text-color-title"> ${
			flightsArray[1] ?? "Unavailable"
		}</h3>\n
        
		<p class="ml-7 text-lg font-bold text-text-color-subtitle"> ${
			flightsArray[2]
		} </p>\n
        
		<p class="ml-7 text-sm font-light text-text-color-subtitle"> ${flightClass.get(
			parseInt(flightsArray[17])
		)} </p>\n
        
		</div>`;

		return node;
	}
}

function onFlightClick(event) {
	if (
		event.target.dataset &&
		event.target.dataset.lat &&
		event.target.dataset.long
	) {
		moveToFlight(event.target.dataset.lat, event.target.dataset.long);
	}
}

function addFlightsToList(flightsArray) {
	const list_component = document.getElementById("container__list-component");

	flightsArray.forEach((flight) => {
		if (flight.length == 18 && flight[5] && flight[6]) {
			list_component.appendChild(createFlight(flight));
		}
	});
}

function filterFlights(key, value, flightArray) {
	if (key && value && flightArray) {
	}
}

function bindOnClicksToButtons() {
	const openFilterMenuButton = document.querySelector(
		".list-options__filter-button"
	);
	const closeFilterMenuButton = document.querySelector(
		".filter-options__close-button"
	);

	const applyFlightFiltersButton = document.querySelector(
		".filter-options__apply-button"
	);

	if (openFilterMenuButton) {
		openFilterMenuButton.onclick = () => {
			toggleFilterOptionsMenu();
		};
	}
	if (closeFilterMenuButton) {
		closeFilterMenuButton.onclick = () => {
			toggleFilterOptionsMenu();
		};
	}
	if (applyFlightFiltersButton) {
		applyFlightFiltersButton.onclick = () => {
			applyFlightFilters(flightFilterOptions);
		};
	}
}

function bindOnChangeToFilterOptions() {
	const originCountryInput = document.querySelector(".origin-country-input");
	const flightStatusInput = document.querySelectorAll(".flight-status__option");
	const flightCategoryInput = document.querySelector(".flight-category-input");

	if (originCountryInput)
		originCountryInput.onchange = (event) => {
			onFlightFilterChange(
				"originCountry",
				event.target.value,
				flightFilterOptions
			);
		};

	if (flightStatusInput) {
		flightStatusInput.forEach((statusInput) => {
			statusInput.onclick = (event) => {
				onFlightFilterChange(
					"flightStatus",
					event.target.value,
					flightFilterOptions
				);
			};
		});
	}

	if (flightCategoryInput)
		flightCategoryInput.onchange = (event) => {
			onFlightFilterChange(
				"flightCategory",
				event.target.value,
				flightFilterOptions
			);
		};
}

/* 
From lecture example by Timothy H.
*/
function toggleFilterOptionsMenu() {
	const menu = document.querySelector(".container__filter-options");
	if (menu) {
		if (menu.classList.contains("container__filter-options--show"))
			menu.classList.remove("container__filter-options--show");
		else menu.classList.add("container__filter-options--show");
	}
}

function addFilterOptions() {
	const flightCategoryInput = document.querySelector(".flight-category-input");

	if (flightCategoryInput) {
		flightClass.forEach((flightCategory) => {
			const flightCategoryOption = document.createElement("option");
			flightCategoryOption.value = flightCategory;
			flightCategoryOption.innerText = flightCategory;
			flightCategoryInput.appendChild(flightCategoryOption);
		});
	}
}

function onFlightFilterChange(filterKey, filterValue, flightFilterOptions) {
	if (filterKey && flightFilterOptions) {
		flightFilterOptions[`${filterKey}`] = `${filterValue}`;
	}
}

function applyFlightFilters(filterOptions) {
	console.log(filterOptions);
}

const listObserver = {
	next: (flightDataArray) => {
		addFlightsToList(flightDataArray);
	},
	error: (error) => {
		return error;
	},
};

export {
	createFlight,
	addFlightsToList,
	getClass,
	toggleFilterOptionsMenu,
	bindOnClicksToButtons,
	bindOnChangeToFilterOptions,
	addFilterOptions,
	listObserver,
};
