'use client';

import React, { useState, useEffect } from 'react';
import useRequestData from '@/components/hooks/useRequestData';
import Loader from '@/components/Loader';
import Error from '@/components/Error';
import Link from 'next/link';
import { FaChevronLeft } from 'react-icons/fa6';

export default function VHS_Edit() {
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

    const redigeretText = { content: content };

    makeRequestPUT(`http://localhost:5023/aboutus/admin`, 'PUT', redigeretText);
  };

  return (
    <>
      <h1 className='text-center text-4xl font-semibold my-5'>Rediger siden om os</h1>

      {error || (errorPUT && <Error />)}
      {isLoading || (isLoadingPUT && <Loader />)}

      {dataPUT && (
        <div className='card w-full bg-base-100 shadow-xl'>
          <div className='card-body'>
            <h2 className='text-center italic text-2xl'>Teksten er blevet redigeret</h2>
            <div>
              <p>{dataPUT.about.content}</p>
            </div>
          </div>
        </div>
      )}

      <form className='form-control my-10' onSubmit={handleSubmit}>
        <label className='form-control' name='txtContent'>
          <div className='label'>
            <span className='label-text'>Rediger om os</span>
          </div>
          <textarea
            className='textarea textarea-bordered h-36'
            placeholder='Indtast kommentar her...'
            value={content}
            name='txtContent'
            id='txtContent'
            onInput={(e) => setContent(e.target.value)}></textarea>
        </label>

        <div className='mt-10 flex'>
          <Link
            href={{
              pathname: `/pages/viborgHaveService_1`,
            }}
            className='btn btn-primary mr-5 h-fit flex w-fit'>
            <FaChevronLeft className='' /> Tilbage
          </Link>
          <button type='submit' className='btn btn-accent h-fit'>
            Færdiggør
          </button>
        </div>
      </form>
    </>
  );
}
