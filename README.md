# Travel App

## Introduction
It’s common to pull basic data from an API, but many applications don’t just pull the weather, they pull in multiple types of data, from different sources and occasionally one API will be required to get data from another API.

The project will include a simple form where you enter the location you are traveling to and the date you are leaving. If the trip is within a week, you will get the current weather forecast. If the trip is in the future, you will get a predicted forecast. We are going to use the `Weatherbit API`. `Weatherbit API` has one problem, it only takes in `coordinates for weather data` -- it’s that specific. So, we’ll need to get those coordinates from the `Geonames API`. Once we have all of this data, we’ll want to display an image of the location entered; for this, we will be using the `Pixabay API`.

This is very `JavaScript` heavy, but it also deals with clean and appealing HTML/CSS. The project will also be targeting the DOM, working with objects, and retrieving data from 3 APIs in which one of those is reliant on another to work. 

Finally, this is all going to be done in a Webpack environment, using an express server, and wrapped up with service workers.

## APIs Required
1. Weatherbit
2. Geonames
3. Pixabay
4. REST Countries
