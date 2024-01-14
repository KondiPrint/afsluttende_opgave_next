'use client';
import Loader from '@/components/Loader';
import Error from '@/components/Error';
import useRequestData from '@/components/hooks/useRequestData';

export default function Home() {
  const { data, isLoading, error, makeRequest } = useRequestData();

  return (
    <>
      <section className='min-h-full'>
        <h1>Home</h1>
      </section>

      {isLoading && <Loader />}
      {error && <Error />}
    </>
  );
}
