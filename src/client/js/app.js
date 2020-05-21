import { 
    getTripCity,
    getTripStartDate,
    fetchLocation,
    fetchWeatherForecast,
    fetchPhoto,
    fetchCountryInfo,
    getCountdown,
    FORECAST
} from "./travel";

// global variables

const tripInfo = {};

let savedTrips = [];

// Helper functions
function updateUI(savedTrips) {
    
    if (!savedTrips) {
        alert("Could not find any saved trips. Try again later!");
        return;
    }

    let tripsNode = document.getElementById("trips");
    
    const tripCards = savedTrips.map((trip, idx) => {
        
        // create list item
        const listItem = document.createElement("li");
        listItem.setAttribute("class", "card-content");
        
        // create span
        const spanNode = document.createElement("span");
        const imgElement = document.createElement("img");
        imgElement.setAttribute("id", idx);
        imgElement.setAttribute("src", trip.photoUrl);
        imgElement.setAttribute("alt", "trip city photo");
        spanNode.appendChild(imgElement);

        // create div
        const divNode = document.createElement("div");

        const tripHeading = document.createElement("h3");
        tripHeading.setAttribute("id", "trip-city");
        tripHeading.innerHTML = trip.city;

        const tripWeather = document.createElement("p");
        tripWeather.setAttribute("id", "weather");
        tripWeather.innerHTML = `${tripInfo.weatherForecast.temperature} &deg; C `;
        
        const tripCountdown = document.createElement("p");
        tripCountdown.setAttribute("id", "trip-countdown");
        tripCountdown.innerHTML = `Your trip is ${tripInfo.countdown} days away`;

        divNode.appendChild(tripHeading);
        divNode.appendChild(tripWeather);
        divNode.appendChild(tripCountdown);

        // add span and div to list item
        listItem.appendChild(spanNode);
        listItem.appendChild(divNode);

        return listItem;
    });

    // add cards to the trip node section
    tripCards.forEach(card => {
        tripsNode.appendChild(card);
    });
}

function updateSearchView(tripInfo) {
    
    const tripCityElement = document.getElementById('trip-city');
    const weatherElement = document.getElementById('weather');
    const tripCountdownElement = document.getElementById('trip-countdown');

    tripCityElement.innerHTML = tripInfo.city;
    weatherElement.innerHTML = `${tripInfo.weatherForecast.temperature} &deg; C `;
    tripCountdownElement.innerHTML = `Your trip is ${tripInfo.countdown} days away`;

    document.getElementById("search-result").classList.remove("display-result");
}

function removeSearchResult() {

    // clear search results
    document.getElementById("trip-image").setAttribute("src", "#");
    document.getElementById("trip-city").innerHTML = "";
    document.getElementById("weather").innerHTML = "";
    document.getElementById("trip-countdown").innerHTML = "";

    //  hide the card
    document.getElementById("search-result").classList.add("display-result");
}

async function handleSubmit(e) {

    e.preventDefault();
    
    // fetch trip details
    tripInfo.city = getTripCity();
    tripInfo.startDate = getTripStartDate();
    
    if (!tripInfo.city || !tripInfo.startDate) {
        alert("City and Start Date are required!");
        return;
    }
    
    // get countdown
    tripInfo.countdown = getCountdown(tripInfo.startDate);
    
    // fetch the location information from geonames
    tripInfo.location = await fetchLocation(tripInfo.city);

    if ( tripInfo.location === null) {
        alert("Error fetching location details... Try again later!");
        return;
    }

    // fetch weather forecast for trip from Weatherbit
    tripInfo.weatherForecast = await fetchWeatherForecast(tripInfo.location.latitude, tripInfo.location.longitude);

    // fetch the location photo from pixabay
    tripInfo.photoUrl = await fetchPhoto(tripInfo.city, tripInfo.location.countryName);

    // fetch the country information from restcountries
    tripInfo.location.country = await fetchCountryInfo(tripInfo.location.countryName);

    console.log(tripInfo);
    updateSearchView(tripInfo);
}

// Save trip information
const handleSave = async (e) => {
    e.preventDefault();
  
    try {
        const response = await fetch('http://localhost:8081/trip/save', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ trip: tripInfo })
        });
    
        if (!response.ok) {
            return null;
        }
        
        savedTrips = await response.json();
        
        removeSearchResult();
        updateUI(savedTrips);
        
        console.log(savedTrips);
        return savedTrips;

    } catch (error) {
      console.log(error);
    }
  }

export {
    handleSubmit,
    handleSave
}