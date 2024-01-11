'use client';
import Loader from '@/components/Loader';
import Error from '@/components/Error';
import useRequestData from '@/components/hooks/useRequestData';
import Slider from '@/components/Slider';
import { useEffect } from 'react';

export default function Reviews() {
  const { data, isLoading, error, makeRequest } = useRequestData();

  useEffect(() => {
    makeRequest('http://localhost:5023/reviews', 'GET');
  }, []);

  return (
    <>
      {isLoading && <Loader />}
      {error && <Error />}

      <div className='h-dvh'>
        <div className='bg-img-bg h-5/6 object-cover bg-lime-600 bg-blend-overlay'>
          <h1 className='text-center pt-24 text-7xl text-white'>Kundeudtalelser</h1>
          <div className='flex justify-center'>
            <div className='w-32 border-b-4 h-1 pt-5'></div>
          </div>
          <div className='h-2/3 flex items-center'>
            <div className='lg:w-3/4 m-auto my-2 align-middle'>
              <Slider loop>
                {data &&
                  data.map((c, i) => (
                    <div className='relative h-44 flex-[0_0_100%] text-white text-center text-2xl' key={i}>
                      <h2 className=''>"{c.content}"</h2>
                      <h3 className='mt-5'>- {c.author}</h3>
                    </div>
                  ))}
              </Slider>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
