import React from 'react';
import { FaArrowDownLong } from 'react-icons/fa6';

const WeatherCard = ({ data }) => {
  return (
    <>
      {data && (
        <article className='card w-1/2 m-auto'>
          <h2 className='my-4 text-3xl font-bold text-center'>Weather for {data.name}</h2>
          <h3 className='text-center text-xl italic my-6'>{data.weather[0].description}</h3>
          <figure className='m-auto card w-fit bg-sky-500 rounded-full my-6'>
            <img src={`https://openweathermap.org/img/wn/${data.weather[0].icon}` + '.png'} alt='' />
          </figure>
          <ul className='ml-5 list-disc divide-y divide-gray-200'>
            <li className='py-4'>Temperature: {Math.round(data.main.temp)}&deg;C</li>
            <li className='py-4'>Feels like: {data.main.feels_like}&deg;C</li>
            <li className='py-4'>Relative humidity: {data.main.humidity}%</li>
            <li className='py-4'>Wind-speed: {Math.round(data.wind.speed)} m/s</li>
            <li className='py-4'>
              Wind-degree: {data.wind.deg}&deg; <FaArrowDownLong style={{ display: 'inline-block', transform: `rotate(${data.wind.deg}deg)` }} />
            </li>
            <li className='py-4'>Sunrise at: {new Date(data.sys.sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</li>
            <li className='py-4'>Sunset at: {new Date(data.sys.sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</li>
          </ul>
        </article>
      )}
    </>
  );
};

export default WeatherCard;
