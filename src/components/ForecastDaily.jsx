import React from 'react'

const ForecastDaily = ({ title, weather }) => {
    const { daily } = weather.formattedForecastWeather;

    return (
        <div>
            <div className='flex items-center justify-start my-6'>
                <p className='text-white font-medium uppercase'>{title}</p>
            </div>
            <hr className='my-2' />

            <div className='flex flex-row items-center justify-between text-white'>
                {daily.map((day, index) => (
                    <div key={index} className='flex flex-col items-center justify-center'>
                        <p className='font-light text-sm'>{day.title}</p>
                        <img src={day.conditionIcon} alt='' className='w-12 my-1' />
                        <p className='font-medium'>{`${((day.minTempC + day.maxTempC) / 2).toFixed()}°C`}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ForecastDaily