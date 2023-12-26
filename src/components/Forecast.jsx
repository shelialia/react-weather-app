import React from 'react';

const Forecast = ({ title, weather }) => {
    console.log(weather);
    const { hourly } = weather.formattedForecastWeather;
    if (!hourly || hourly.length === 0) {
        return <div>No hourly forecast available.</div>;
    }
    return (
        <div>
            <div className='flex items-center justify-start my-6'>
                <p className='text-white font-medium uppercase'>{title}</p>
            </div>
            <hr className='my-2' />

            <div className='flex flex-row items-center justify-between text-white'>
                {hourly.map((hour, index) => (
                    <div key={index} className='flex flex-col items-center justify-center'>
                        <p className='font-light text-sm'>{hour.time}</p>
                        <img src={hour.conditionIcon} alt='' className='w-12 my-1' />
                        <p className='font-medium'>{`${hour.tempC.toFixed()}°C`}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Forecast;