'use client';

import React, { useState, useEffect } from 'react';
import useRequestData from '@/components/hooks/useRequestData';
import Loader from '@/components/Loader';
import Error from '@/components/Error';
import Link from 'next/link';

const ShoppingListEdit = () => {
  const { data, isLoading, error, makeRequest } = useRequestData(); // * GET
  const { data: dataPUT, isLoading: isLoadingPUT, error: errorPUT, makeRequest: makeRequestPUT } = useRequestData(); // * PUT

  const [content, setContent] = useState('');

  // * Hent data (GET)
  useEffect(() => {
    makeRequest(`http://localhost:5023/aboutus`, 'GET', null);
  }, []);

  useEffect(() => {
    if (data) {
      setContent(data.content);
    }
  }, [data]);

  // * Der er klikket på submit-button - send data til API (PUT)
  const handleSubmit = (e) => {
    e.preventDefault(); //VIGTIG!!

    const redigeretText = { data: { content: content } };

    makeRequestPUT(`http://localhost:5023/aboutus/admin`, 'PUT', redigeretText);
  };

  return (
    <>
      <h1 className='text-center text-4xl font-semibold my-5'>Rediger siden om os</h1>

      {error || (errorPUT && <Error />)}
      {isLoading || (isLoadingPUT && <Loader />)}

      {dataPUT && (
        <div className='card mb-6'>
          <h2 className='text-center italic text-2xl'>The list has been edited</h2>
          <div className='border-2'>
            <p>
              <span className='font-bold'>Indhold:</span>
              <br /> {dataPUT.content}
            </p>
          </div>
        </div>
      )}

      <form className='form-control mx-auto w-11/12' onSubmit={handleSubmit}>
        <div>
          <label htmlFor='txtContent' className='block mb-5 font-semibold text-lg'>
            Indhold
          </label>
          <textarea className='border-2' value={content} onInput={(e) => setContent(e.target.value)} name='txtContent' id='txtContent' cols='50' rows='10' placeholder='Indhold her...'></textarea>
        </div>

        <div className='mt-12'>
          <Link
            href={{
              pathname: `/pages/viborgHaveService_1`,
            }}
            className='rounded-md bg-green-500 p-2 mr-4'>
            ← Back
          </Link>
          <button type='submit' className='rounded-md bg-blue-500 p-2'>
            Finalise Edit
          </button>
        </div>
      </form>
    </>
  );
};
export default ShoppingListEdit;
