'use client';

import React, { useState } from 'react';
import useRequestData from '@/components/hooks/useRequestData';
import Link from 'next/link';
import Loader from '@/components/Loader';
import Error from '@/components/Error';
import { FaChevronLeft } from 'react-icons/fa6';

export default function Opret_kommentar() {
  const { data, isLoading, error, makeRequest } = useRequestData();

  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');

  // * Der er klikket på submit-button - send data til API
  const handleSubmit = (e) => {
    e.preventDefault(); //VIGTIG!!

    const nyKommentar = { author: author, content: content };

    makeRequest('http://localhost:5023/reviews/admin/', 'POST', nyKommentar);
  };

  return (
    <>
      <h1 className='text-center text-4xl font-semibold my-5'>Opret din kommentar her</h1>

      {isLoading && <Loader />}
      {error && <Error />}

      {/* Beskeden når der er rettet data - PUT */}

      {data && (
        <div className='card mb-6'>
          <h2 className='text-center italic text-2xl'>Kommentaren er nu oprettet</h2>
          <div className='card'>
            <p>
              <span className='font-bold'>Forfatter:</span>
              <br /> {data.review.author}
            </p>
            <p>
              <span className='font-bold'>Kommentar:</span>
              <br /> {data.review.content}
            </p>
          </div>
        </div>
      )}

      <form className='form-control' onSubmit={handleSubmit}>
        <label className='form-control w-full max-w-xs' name='inpAuthor'>
          <div className='label'>
            <span className='label-text'>Forfatter</span>
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
            <span className='label-text'>Kommentar</span>
          </div>
          <textarea
            className='textarea textarea-bordered h-24'
            placeholder='Indtast kommentar her...'
            value={content}
            name='txtContent'
            id='txtContent'
            onInput={(e) => setContent(e.target.value)}></textarea>
        </label>

        <div className='mt-10 flex'>
          <Link
            href={{
              pathname: `/pages/reviews/reviews_admin`,
            }}
            className='btn btn-primary mr-5 h-fit flex w-fit'>
            <FaChevronLeft /> Tilbage
          </Link>
          <button type='submit' className='btn btn-primary h-fit'>
            Færdiggør
          </button>
        </div>
      </form>
    </>
  );
}
