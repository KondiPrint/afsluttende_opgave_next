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

      <section className='h-full'>
        <article className=' bg-img-bg bg-lime-600 bg-blend-overlay'>
          <h1 className='text-center pt-24 text-5xl md:text-7xl text-white '>Kundeudtalelser</h1>
          <div className='flex justify-center'>
            <span className='w-32 border-b-4 h-1 pt-5'></span>
          </div>
          <div className='lg:w-11/12 mx-auto relative'>
            <Slider loop>
              {data &&
                data.map((t, index) => (
                  <div className='relative h-96 flex-[0_0_100%] text-white font-semibold text-center sm:text-2xl flex flex-col justify-center' key={index}>
                    <h2>"{t.content}"</h2>
                    <h3 className='mt-5'>- {t.author}</h3>
                  </div>
                ))}
            </Slider>
          </div>
        </article>
      </section>
    </>
  );
}
