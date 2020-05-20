import { 
    getTripCity,
    getTripStartDate,
    fetchLocation,
    fetchWeatherForecast,
    fetchPhoto,
    fetchCountryInfo,
    FORECAST
} from "./travel";

async function handleSubmit(e) {

    let trip = {};

    e.preventDefault();

    // fetch trip details
    trip.city = getTripCity();
    trip.startDate = getTripStartDate();

    // fetch the location information from geonames
    trip.location = await fetchLocation(trip.city);

    // fetch weather forecast for trip from Weatherbit
    trip.weatherForecast = await fetchWeatherForecast(trip.location.latitude, trip.location.longitude);

    // fetch the location photo from pixabay
    trip.photoUrl = await fetchPhoto(trip.city, trip.location.country);

    // fetch the country information from restcountries
    trip.location.info = await fetchCountryInfo(trip.location.country);

    console.log(trip);

    // update UI
    updateUI();
}

function updateUI() {
    
}

export {
    handleSubmit
}