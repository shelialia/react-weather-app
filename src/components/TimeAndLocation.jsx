import React from 'react';
import { formatToLocalTime } from '../services/weatherService';

const TimeAndLocation = ({ weather: { formattedCurrentWeather } }) => {
    const { localtime_epoch, name, country, tz_id } = formattedCurrentWeather;
  
    return (
      <div>
        <div className='flex items-center justify-center my-6'>
          <p className='text-white text-xl font-extralight'>
            {formatToLocalTime(localtime_epoch, tz_id)}
          </p>
        </div>
  
        <div className='flex flex-col items-center justify-center space-y-2 my-3'>
          <p className='text-white text-2xl font-medium items-center justify-center'>{`${name}, ${country}`}</p>
        </div>


      </div>
    );
  };

export default TimeAndLocation