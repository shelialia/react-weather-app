import React from 'react'

const NewTopButtons = ({setQuery}) => {

  const cities = [
    { 
        id: 1,
        title: 'London',
    },
    { 
        id: 2,
        title: 'New York',
    },
    { 
        id: 3,
        title: 'Tokyo',
    },
    { 
        id: 4,
        title: 'Paris',
    },
    { 
        id: 5,
        title: 'Singapore',
    },
  ] 

  return (
    <div className='flex items-center justify-around my-6'>
        {cities.map((city) => (
            // we must use key to ensure that we have a unique id for every element ie. every city
            <button key={city.id} className='text-white text-lg font-medium'
            onClick={() => setQuery({q: city.title})}>{city.title}</button>
        
        ))}
    </div>
  )
}

export default NewTopButtons