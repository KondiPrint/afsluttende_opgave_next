import React from 'react';
import { FaArrowDownLong } from 'react-icons/fa6';

const Vejr_kort = ({ data }) => {
  return (
    <>
      {data && (
        <div className='card'>
          <article className='card-body m-auto shadow-xl'>
            <h2 className='my-4 text-3xl card-title'>Vejret for {data.name}</h2>
            <h3 className='text-center text-xl italic my-6'>{data.weather[0].description}</h3>
            <figure className='m-auto w-fit bg-sky-500 rounded-full my-6'>
              <img src={`https://openweathermap.org/img/wn/${data.weather[0].icon}` + '.png'} alt='' />
            </figure>
            <ul className='ml-5 list-none divide-y divide-gray-200'>
              <li className='py-4'>Temperatur: {Math.round(data.main.temp)}&deg;C</li>
              <li className='py-4'>Føles som: {Math.round(data.main.feels_like)}&deg;C</li>
              <li className='py-4'>Relativ fugtighed: {data.main.humidity}%</li>
              <li className='py-4'>Vind styrke: {Math.round(data.wind.speed)} m/s</li>
              <li className='py-4'>
                Wind-degree: {data.wind.deg}&deg; <FaArrowDownLong style={{ display: 'inline-block', transform: `rotate(${data.wind.deg}deg)` }} />
              </li>
              <li className='py-4'>Sunrise at: {new Date(data.sys.sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</li>
              <li className='py-4'>Sunset at: {new Date(data.sys.sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</li>
            </ul>
          </article>
        </div>
      )}
    </>
  );
};

export default Vejr_kort;
