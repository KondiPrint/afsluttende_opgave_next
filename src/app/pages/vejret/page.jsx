'use client';

import React from 'react';
import { useEffect, useState } from 'react';
import useRequestData from '@/components/hooks/useRequestData';
import Loader from '@/components/Loader';
import Error from '@/components/Error';
import Vejr_kort from '@/components/Vejr_kort';
import Vejr_udsigt from '@/components/Vejr_udsigt';
import Vejr_Map from '@/components/Vejr_map';
import VejrMap from '@/components/Map/Map';

export default function Vejret() {
  const { data, isLoading, error, makeRequest } = useRequestData();

  const { data: dataZipcode, isLoading: isLoadingZipcode, error: errorZipcode, makeRequest: makeRequestZipcode } = useRequestData();

  const { data: dataForecast, isLoading: isLoadingForecast, error: errorForecast, makeRequest: makeRequestForecast } = useRequestData();

  const { data: dataCoord, isLoading: isLoadingCoord, error: errorCoord, makeRequest: makeRequestCoord } = useRequestData();

  const { data: dataMap, isLoading: isLoadingMap, error: errorMap, makeRequest: makeRequestMap } = useRequestData();

  const [zip, setZip] = useState('8240');
  const [valid, setValid] = useState(true);

  const [lat, setLat] = useState(56);
  const [lon, setLon] = useState(10);

  useEffect(() => {
    makeRequestZipcode(`https://api.dataforsyningen.dk/postnumre/autocomplete?q=${zip}`, 'GET');

    if (valid) {
      makeRequest(`https://api.openweathermap.org/data/2.5/weather?zip=${zip},dk&units=metric&&appid=9054bb4dc6a164f93ef4ceb91f4fc8e2&lang=da`, 'GET');

      makeRequestForecast(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&lang=da&units=metric&appid=9054bb4dc6a164f93ef4ceb91f4fc8e2`, 'GET');

      makeRequestCoord(`https://api.openweathermap.org/geo/1.0/zip?zip=${zip},dk&appid=9054bb4dc6a164f93ef4ceb91f4fc8e2`, 'GET');

      makeRequestMap(`https://api.openweathermap.org/data/2.5/weather?zip=${zip},dk&lang=da&units=metric&appid=9054bb4dc6a164f93ef4ceb91f4fc8e2`);
    }
  }, [zip]);

  return (
    <>
      <h1 className='text-center text-4xl font-semibold my-5'>Vejrudsigt</h1>

      {isLoading && <Loader />}
      {error && <Error />}

      <div className='flex flex-col my-6'>
        <input
          type='text'
          list='list_zips'
          id='zip_code'
          name='zip_code'
          maxLength={4}
          minLength={4}
          pattern='[0-9]{4}'
          placeholder='Type zip-code here'
          required
          onChange={(e) => {
            {
              setZip(e.target.value);
              setValid(e.target.checkValidity());
              const { lat, lon } = dataCoord || {};
              setLat(lat);
              setLon(lon);
            }
          }}
          className='input input-bordered w-full max-w-xs text-center m-auto'
        />

        <datalist id='list_zips'>
          {dataZipcode &&
            dataZipcode.map((z, index) => (
              <option key={index} value={z.postnummer.nr}>
                {z.postnummer.nr} {z.postnummer.navn}
              </option>
            ))}
        </datalist>
      </div>

      <div className='card'>
        <div className='card-body shadow-xl grid grid-cols-1 md:grid-cols-2 w-full h-full'>
          {data && <Vejr_kort data={data} />}
          {dataMap && <Vejr_Map coord={[dataMap.coord.lat, dataMap.coord.lon]} info={dataMap.weather[0].description} zoom='10' setLat={setLat} setLon={setLon} />}
        </div>
      </div>

      {data && <Vejr_udsigt dataForecast={dataForecast} dataCoord={dataCoord} />}
    </>
  );
}
