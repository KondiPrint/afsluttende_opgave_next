'use client';
import Loader from '@/components/Loader';
import Error from '@/components/Error';
import useRequestData from '@/components/hooks/useRequestData';
import { useEffect, useState } from 'react';
import DK_liste from '@/components/EnergiDK_liste';
import AntalPerSide from '@/components/AntalPerSide';
import PrevNext from '@/components/Prev_Next';

export default function EnergiData() {
  const { data, isLoading, error, makeRequest } = useRequestData();

  const [antalPerSide, setAntalPerSide] = useState(10);
  const [currentSide, setCurrentSide] = useState(0);
  const [kategori, setKategori] = useState('1');
  const [datoStart, setDatoStart] = useState('2024-01-09T00:00');
  const [datoSlut, setDatoSlut] = useState('2024-01-17T00:00');

  useEffect(() => {
    makeRequest(`https://api.energidataservice.dk/dataset/Elspotprices?offset=0&start=${datoStart}&end=${datoSlut}&filter=%7B%22PriceArea%22:[%22dk${kategori}%22]%7D&sort=HourDK%20DESC`, 'GET');
  }, [kategori, datoStart, datoSlut]);

  let dataLength = data?.total;

  return (
    <>
      <h1 className='text-center text-4xl font-semibold my-10'>Energidata</h1>

      {isLoading && <Loader />}
      {error && <Error />}

      <section className='flex flex-wrap mb-7 gap-y-5 w-full justify-between sm:gap-y-0'>
        <form className='flex flex-wrap gap-y-5'>
          <label className='max-w-xs w-fit'>
            <div className='label'>
              <span className='label-text'>Fra</span>
            </div>
            <input
              className='input input-bordered max-w-xs mr-5'
              type='datetime-local'
              id='datePast'
              name='meeting-time'
              min='2023-12-28T20:00'
              max='2024-01-13T00:00'
              value={datoStart}
              onChange={(e) => setDatoStart(e.target.value)}
            />
          </label>
          <label className='max-w-xs w-fit'>
            <div className='label'>
              <span className='label-text'>Til</span>
            </div>
            <input
              className='input input-bordered max-w-xs mr-5'
              type='datetime-local'
              id='dateFuture'
              name='meeting-time'
              value={datoSlut}
              onChange={(e) => {
                setDatoSlut(e.target.value);
              }}
            />
          </label>
          <select defaultValue='Filter' name='sort' id='sort' className='select select-bordered self-end' onChange={(e) => setKategori(e.target.value)}>
            <option disabled>Filter</option>
            <option value='1'>DK1</option>
            <option value='2'>DK2</option>
          </select>
        </form>
        <div className=''>
          <AntalPerSide setAntalPerSide={setAntalPerSide} setCurrentSide={setCurrentSide} />
        </div>
      </section>

      <DK_liste data={data} setAntalPerSide={setAntalPerSide} setCurrentSide={setCurrentSide} antalPerSide={antalPerSide} currentSide={currentSide} />

      <span className='flex justify-center mt-5 md:mt-10'>
        <PrevNext setCurrentSide={setCurrentSide} currentSide={currentSide} dataLength={dataLength} antalPerSide={antalPerSide} data={data} />
      </span>
    </>
  );
}
