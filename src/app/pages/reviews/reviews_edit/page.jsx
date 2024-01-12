'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import useRequestData from '@/components/hooks/useRequestData';
import Loader from '@/components/Loader';
import Error from '@/components/Error';
import Link from 'next/link';

const Ret_Kommentar = ({ searchParams }) => {
  const id = searchParams.id;

  const { data, isLoading, error, makeRequest } = useRequestData();
  const { data: dataPUT, isLoading: isLoadingPUT, error: errorPUT, makeRequest: makeRequestPUT } = useRequestData();

  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    makeRequest(`http://localhost:5023/reviews/${id}`, 'GET', null);
  }, []);

  useEffect(() => {
    if (data) {
      setAuthor(data.author);
      setContent(data.content);
    }
  }, [data]);

  const handleSubmit = (e) => {
    e.preventDefault(); //VIGTIG!!

    const rettedeKommentar = { author: author, content: content };

    makeRequestPUT(`http://localhost:5023/reviews/admin/${id}`, 'PUT', rettedeKommentar);
  };

  return (
    <>
      <h1 className='text-center text-4xl font-semibold my-5'>Ret kommentaren her</h1>

      {error || (errorPUT && <Error />)}
      {isLoading || (isLoadingPUT && <Loader />)}

      {/* Beskeden når der er rettet data - PUT */}

      {dataPUT && (
        <div className='card w-full bg-base-100 shadow-xl'>
          <div className='card-body'>
            <h2 className='text-center italic text-2xl'>Teksten er blevet redigeret</h2>
            <div>
              <p>
                <span className='font-bold'>Forfatter:</span>
                <br /> {dataPUT.review.author}
              </p>
              <p>
                <span className='font-bold'>Kommentar:</span>
                <br /> {dataPUT.review.content}
              </p>
            </div>
          </div>
        </div>
      )}

      <form className='form-control my-10' onSubmit={handleSubmit}>
        <label className='form-control w-full max-w-xs' name='inpAuthor'>
          <div className='label'>
            <span className='label-text'>Rediger forfatter</span>
          </div>
          <input
            className='input input-bordered w-full max-w-xs'
            type='text'
            placeholder='Indtast forfatter her...'
            value={author}
            name='inpAuthor'
            id='inpAuthor'
            required
            onInput={(e) => setAuthor(e.target.value)}
          />
        </label>

        <label className='form-control' name='txtContent'>
          <div className='label'>
            <span className='label-text'>Rediger kommentar</span>
          </div>
          <textarea
            className='textarea textarea-bordered h-24'
            placeholder='Indtast kommentar her...'
            value={content}
            name='txtContent'
            id='txtContent'
            onInput={(e) => setContent(e.target.value)}></textarea>
        </label>

        <div className='mt-10'>
          <Link
            href={{
              pathname: `/pages/reviews/reviews_admin`,
            }}
            className='btn btn-primary mr-5'>
            ← Tilbage
          </Link>
          <button type='submit' className='btn btn-accent'>
            Færdiggør
          </button>
        </div>
      </form>
    </>
  );
};
export default Ret_Kommentar;
