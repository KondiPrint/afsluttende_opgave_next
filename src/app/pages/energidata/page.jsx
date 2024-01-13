'use client';
import Loader from '@/components/Loader';
import Error from '@/components/Error';
import useRequestData from '@/components/hooks/useRequestData';
import { useEffect, useState } from 'react';
import DK1_liste from '@/components/EnergiDK1_liste';
import AntalPerSide from '@/components/AntalPerSide';
import PrevNext from '@/components/Prev_Next';

export default function EnergiData() {
  const { data, isLoading, error, makeRequest } = useRequestData();

  const [antalPerSide, setAntalPerSide] = useState(10);
  const [currentSide, setCurrentSide] = useState(0);
  const [kategori, setKategori] = useState('1');
  const [datoStart, setDatoStart] = useState('');
  const [datoSlut, setDatoSlut] = useState('');

  useEffect(() => {
    makeRequest(`https://api.energidataservice.dk/dataset/Elspotprices?offset=0&filter=%7B%22PriceArea%22:[%22dk${kategori}%22]%7D&sort=HourDK%20DESC`, 'GET');
  }, [kategori]);

  return (
    <>
      <h1 className='text-center text-4xl font-semibold mt-10 mb-20'>Energidata</h1>

      {isLoading && <Loader />}
      {error && <Error />}

      <AntalPerSide setAntalPerSide={setAntalPerSide} setCurrentSide={setCurrentSide} />

      <form className='my-10 flex'>
        <label className='max-w-xs w-fit'>
          <div className='label'>
            <span className='label-text'>Fra</span>
          </div>
          <input className='input input-bordered max-w-xs mr-5' type='datetime-local' id='datePast' name='meeting-time' min='2023-12-28T20:00' max='2024-01-13T00:00' />
        </label>
        <label className='form-control max-w-xs w-fit'>
          <div className='label'>
            <span className='label-text'>Til</span>
          </div>
          <input className='input input-bordered max-w-xs mr-5' type='datetime-local' id='dateFuture' name='meeting-time' min='2024-01-13T00:00' />
        </label>
        <select defaultValue='Filter' name='sort' id='sort' className='select select-bordered self-end' onChange={(e) => setKategori(e.target.value)}>
          <option disabled>Filter</option>
          <option value='1'>DK1</option>
          <option value='2'>DK2</option>
        </select>
      </form>

      <DK1_liste data={data} setAntalPerSide={setAntalPerSide} setCurrentSide={setCurrentSide} antalPerSide={antalPerSide} currentSide={currentSide} />

      <div className='flex justify-center mt-10'>
        <PrevNext setCurrentSide={setCurrentSide} currentSide={currentSide} dataLength={data?.limit} antalPerSide={antalPerSide} data={data} />
      </div>
    </>
  );
}
