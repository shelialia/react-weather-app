import { DateTime } from "luxon";

const API_KEY = 'c976a080089846318a7102536232312';
const BASE_URL = "https://api.weatherapi.com/v1/forecast.json";

// https://api.weatherapi.com/v1/forecast.json?key=c976a080089846318a7102536232312&q=Singapore&days=1&aqi=no&alerts=no
// searchParams is an object

const getWeatherData = (infoType, searchParams) => {
    const url = new URL(BASE_URL + '?' + infoType);
    url.search = new URLSearchParams({...searchParams, key: API_KEY, days: 5});

    return fetch(url)
        .then((res) => res.json())
};

const formatCurrentWeather = (data) => {
    const {
        current: { temp_c, wind_kph, feelslike_c }, 
        location: { country , localtime_epoch, name, tz_id },
        forecast: { forecastday }
    } = data

    const {
        mintemp_c,
        maxtemp_c,
        condition: { text, icon },
        avghumidity
    } = forecastday[0].day;

    const {
        sunrise, 
        sunset
    } = forecastday[0].astro

    return { temp_c, localtime_epoch, feelslike_c, mintemp_c, maxtemp_c, avghumidity,
    country, text, icon, wind_kph, name, tz_id, sunrise, sunset }
}

const formatForecastWeather = (data) => {

    const first_time = data.location.localtime_epoch;
    const tz_id = data.location.tz_id;

    const daily = data.forecast.forecastday.slice(0, 5).map((day, index) => {
        // Check if localtime_epoch is defined for the first day
        if (index > 0) {
            const timestamp = first_time + index * 86400;
            
            return {
                title: formatToLocalTime(timestamp, day.tz_id, 'ccc'),
                maxTempC: day.day.maxtemp_c,
                minTempC: day.day.mintemp_c,
                conditionIcon: day.day.condition.icon
            };

        } else {
            return {
                title: formatToLocalTime(first_time, day.tz_id, 'ccc'),
                maxTempC: day.day.maxtemp_c,
                minTempC: day.day.mintemp_c,
                conditionIcon: day.day.condition.icon
            }
        }

    });

    const { DateTime } = require("luxon");

    const currentTimestamp = Date.now() / 1000; // Current timestamp in seconds
    const currentHour = DateTime.fromSeconds(currentTimestamp).setZone(tz_id).hour; // Current hour in the specified timezone
    console.log("YOURSLJDSLADJ");
    // Find the index of the next hour in the forecast data
    const nextHourIndex = data.forecast.forecastday[0].hour.findIndex(hour => {
        const hourTimestamp = hour.time_epoch;
        const hourInDay = DateTime.fromSeconds(hourTimestamp).setZone(tz_id).hour;
        return hourInDay > currentHour;
    });
    
    // Slice the next 5 hours from the forecast data
    var next5Hours = data.forecast.forecastday[0].hour.slice(nextHourIndex, nextHourIndex + 5);
    console.log(next5Hours);
    const numberOfNulls = 5 - next5Hours.length;
    
    // Extract the required number of new hours from the next day's forecast
    const nextDayHours = data.forecast.forecastday[1].hour.slice(0, numberOfNulls);
    
    // Combine the 2 arrays into 1 array
    next5Hours = [...next5Hours.filter(hour => hour != null), ...nextDayHours];
    
    const hourly = next5Hours.map(hour => ({
        time: formatToLocalTime(hour.time_epoch, tz_id, 'hh:mm a'),
        tempC: hour.temp_c,
        conditionIcon: hour.condition.icon
    }));

    return { daily, hourly };
    
}

const getFormattedWeatherData = async (searchParams) => {
    const formattedForecastWeather = await 
    getWeatherData('forecast', searchParams).then(formatForecastWeather)
    
    const formattedCurrentWeather = await 
        getWeatherData('weather', searchParams).then(formatCurrentWeather)

    return { formattedCurrentWeather, formattedForecastWeather };
}

const formatToLocalTime = (secs, zone, format = 'cccc | dd LLL yyyy | \'Local Time:\' hh:mm a') => {
    return DateTime.fromSeconds(secs).setZone(zone).toFormat(format);
};

export default getFormattedWeatherData

export { formatToLocalTime }