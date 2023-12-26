import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons'; // Import the specific icon
import { faLocationDot } from '@fortawesome/free-solid-svg-icons'; // Import the specific icon
import { useState } from 'react';

const Inputs = ({setQuery}) => {
  const [city, setCity] = useState("");

  const handleSearchClick = () => {
    if (city !== "") {
      setQuery({q: city})
    }
  }

  const getCountry = (position) => {
    const API_KEY = 'pk.6701736fa43d278b60c5b0b2e81cec21';
    const BASE_URL = "https://us1.locationiq.com/v1/reverse?";
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;

    const url = new URL(BASE_URL);
    url.search = new URLSearchParams({key: API_KEY, lat: lat, lon: lon, format: 'json'});      
    return fetch(url)
    .then((res) => res.json()).then(r => r.address.country)
  }

  function getPosition() {
    // Simple wrapper
    return new Promise((res, rej) => {
        navigator.geolocation.getCurrentPosition(res, rej);
    });
}

  const handleLocationClick = () => {
    getPosition().then(getCountry).then((city) => setQuery({q: city}));
  }

  return (
    <div className='flex flex-row justify-center my-6'>
        <div className='flex flex-row w-full items-center justify-center space-x-4'>
            <input type='text' 
            value={city}
            onChange={(e) => setCity(e.currentTarget.value)}
            placeholder='Enter a city or country name!'
            className='text-xl font-light w-full shadow-xl focus: outline-none capitalize'></input>
            <FontAwesomeIcon icon={faSearch} size='lg' className='text-white cursor-pointer transition ease-out hover:scale-125' 
              onClick={handleSearchClick}/>
            <FontAwesomeIcon icon={faLocationDot} size='lg' className='text-white cursor-pointer transition ease-out hover:scale-125' 
              onClick={handleLocationClick}/>
        </div>
    </div>
  )
}

export default Inputs
