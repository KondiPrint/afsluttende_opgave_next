'use client';
import Loader from '@/components/Loader';
import Error from '@/components/Error';
import useRequestData from '@/components/hooks/useRequestData';

export default function ViborgHaveService2() {
  const { data, isLoading, error, makeRequest } = useRequestData();

  return (
    <>
      <h1>Viborg Have Service2</h1>

      {isLoading && <Loader />}
      {error && <Error />}
    </>
  );
}
