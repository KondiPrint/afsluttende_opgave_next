import React from 'react';
import { FaArrowDownLong } from 'react-icons/fa6';

export default function Vejr_kort({ data }) {
  return (
    <>
      {data && (
        <section className='card w-full'>
          <article className='card-body shadow-xl'>
            <h2 className='my-4 text-3xl card-title'>Vejret for {data.name}</h2>
            <h3 className='text-center text-xl italic my-6 capitalize'>{data.weather[0].description}</h3>
            <figure className='m-auto w-fit bg-sky-500 rounded-full my-6'>
              <img src={`https://openweathermap.org/img/wn/${data.weather[0].icon}` + '.png'} alt='' />
            </figure>
            <ul className='ml-5 list-none divide-y divide-gray-200 [&>li]:py-4'>
              <li>Temperatur: {Math.round(data.main.temp)}&deg;C</li>
              <li>Føles som: {Math.round(data.main.feels_like)}&deg;C</li>
              <li>Relativ fugtighed: {data.main.humidity}%</li>
              <li>Vind styrke: {Math.round(data.wind.speed)} m/s</li>
              <li>
                Wind-degree: {data.wind.deg}&deg; <FaArrowDownLong style={{ display: 'inline-block', transform: `rotate(${data.wind.deg}deg)` }} />
              </li>
              <li>Sunrise at: {new Date(data.sys.sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</li>
              <li>Sunset at: {new Date(data.sys.sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</li>
            </ul>
          </article>
        </section>
      )}
    </>
  );
}
