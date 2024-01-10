'use client';
import Loader from '@/components/Loader';
import Error from '@/components/Error';
import useRequestData from '@/components/hooks/useRequestData';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function ViborgHaveService1() {
  const { data, isLoading, error, makeRequest } = useRequestData();
  const { data: dataImg, isLoading: isLoadingImg, error: errorImg, makeRequest: makeRequestImg } = useRequestData();

  const [imgTaT, setImgTaT] = useState(2);

  useEffect(() => {
    makeRequest('http://localhost:5023/aboutus', 'GET');
  }, []);
  useEffect(() => {
    makeRequestImg('http://localhost:5023/services', 'GET');
  }, []);

  /* const sliceData = (dataToSlice) => {
    return dataToSlice.slice(imgTaT);
  }; */

  return (
    <>
      {isLoading && <Loader />}
      {error && <Error />}

      <div className='container grid grid-cols-2 grid-rows-2 m-6'>
        <div className='row-span-2'>
          <h1 className='text-5xl mb-14'>
            Velkommen til{' '}
            <span className='text-green-500 font-semibold'>
              Viborg <span className='border-b-2 border-solid pb-3 border-green-500'>Hav</span>eservice
            </span>
          </h1>
          {data && (
            <div
              dangerouslySetInnerHTML={{ __html: data.content }}
              className='text-gray-500 text-xl w-11/12 [&>ul]:mt-3 [&>ul]:mb-5 [&>ul>li]:list-disc [&>ul>li]:ml-4 row-start-2 col-start-1 col-end-2'></div>
          )}
        </div>
        <div className='row-span-2 grid grid-cols-2 gap-2'>
          {data &&
            dataImg?.slice(1, -1).map((a) => (
              <div key={a._id}>
                <figure>
                  <img src={a.image} alt='' />
                </figure>
                <h2 className='text-2xl'>{a.title}</h2>
                <p className='text-gray-500'>{a.content}</p>
              </div>
            ))}
        </div>
      </div>
      <Link href='/pages/viborgHaveService_2'>
        <button className='rounded-md p-4 bg-green-500 ml-6 text-white my-10 hover:bg-green-400'>SE ALLE YDELSER</button>
      </Link>
    </>
  );
}
