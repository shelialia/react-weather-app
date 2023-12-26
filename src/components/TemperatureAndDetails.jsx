import React from 'react'
import {
    UilTemperature,
    UilTear,
    UilWind,
    UilSun,
    UilSunset,
} from "@iconscout/react-unicons";

const TemperatureAndDetails = ({ weather: { formattedCurrentWeather } }) => {
    const { text, icon, temp_c, mintemp_c, maxtemp_c, sunrise, sunset,
        wind_kph, avghumidity, feelslike_c } = formattedCurrentWeather;
    
    return (
    <div>
        <div className='flex item-center justify-center py-6
        text-xl text-yellow-300'>
            <p>{text}</p>
        </div>

        <div className='flex flex-row items-center justify-between
        text-white py-3'>
            <img
                src={icon}
                alt=''
                className='w-20' />
            <p className='text-5xl'>{`${temp_c.toFixed()}°C`}</p>
            <div className='flex flex-col space-y-2'>


                <div className='flex font-light text-sm items-center
                justify-center'>
                    <UilTemperature size={18} className="mr-1" />
                    Feels like: 
                    <span className='font-medium ml-1'>{`${feelslike_c.toFixed()}°C`}</span>
                </div>

                <div className='flex font-light text-sm items-center
                justify-center'>
                    <UilTear size={18} className="mr-1" />
                    Humidity: 
                    <span className='font-medium ml-1'>{`${avghumidity.toFixed()}%`}</span>
                </div>

                <div className='flex font-light text-sm items-center
                justify-center'>
                    <UilWind size={18} className="mr-1" />
                    Wind:
                    <span className='font-medium ml-1'>{`${wind_kph.toFixed()}km/h`}</span>
                </div>
            </div>
        </div>

        <div className='flex flex-row items-center justify-center space-x-1.5
                text-white text-sm py-3'>
                    <UilSun />
                    <p className='font-light'>
                        Rise: <span className='font-medium ml-1'>{`${sunrise}`}</span>
                    </p>
                    <p className='font-light'>|</p>

                    <UilSunset />
                    <p className='font-light'>
                        Set: <span className='font-medium ml-1'>{`${sunset}`}</span>
                    </p>
                    <p className='font-light'>|</p>

                    <UilSun />
                    <p className='font-light'>
                        High: <span className='font-medium ml-1'>{`${maxtemp_c.toFixed()}°C`}</span>
                    </p>
                    <p className='font-light'>|</p>

                    <UilSun />
                    <p className='font-light'>
                        Low: <span className='font-medium ml-1'>{`${mintemp_c.toFixed()}°C`}</span>
                    </p>
        </div>
    </div>
  )
}

export default TemperatureAndDetails