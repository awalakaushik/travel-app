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
        return;
    }
}

function updateSearchView(tripInfo) {
    const tripCityElement = document.getElementById('trip-city');
    const weatherElement = document.getElementById('weather');
    const tripCountdownElement = document.getElementById('trip-countdown');

    tripCityElement.innerHTML = tripInfo.city;
    weatherElement.innerHTML = tripInfo.weatherForecast.temperature;
    tripCountdownElement.innerHTML = tripInfo.countdown;
}

async function handleSubmit(e) {

    e.preventDefault();

    // fetch trip details
    tripInfo.city = getTripCity();
    tripInfo.startDate = getTripStartDate();
    
    if (!tripInfo.city || !tripInfo.startDate) {
        throw new Error("City and Start Date are required!");
    }
    
    // get countdown
    tripInfo.countdown = getCountdown(tripInfo.startDate);
    
    // fetch the location information from geonames
    tripInfo.location = await fetchLocation(tripInfo.city);

    if ( tripInfo.location === null) {
        throw new Error("Error fetching location details... Try again later!");
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
        
        // TODO: update UI
        //updateUI(savedTrips);
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