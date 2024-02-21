'use client';

import { React, useEffect, useState } from 'react';
import useRequestData from '@/components/hooks/useRequestData';
import Loader from '@/components/Loader';
import Error from '@/components/Error';
import Link from 'next/link';

export default function Film_Liste() {
  const { makeRequest, isLoading, data, error } = useRequestData();

  const [searchFilm, setSearchFilm] = useState('simon');

  const getNewFact = () => {
    makeRequest(
      'https://imdb146.p.rapidapi.com/v1/find/',
      'GET',
      null,
      {
        'X-RapidAPI-Key': 'YOUR_API_KEY',
        'X-RapidAPI-Host': 'imdb146.p.rapidapi.com',
      },
      { query: searchFilm }
    );
  };

  useEffect(() => {
    getNewFact();
  }, []);

  const handleSearchKeyDown = (e) => {
    if (e.key === 'Enter' || e.code === 'Enter') {
      handleSearch(e);
    }
  };

  // * Søgning i API'en
  const handleSearch = (e) => {
    e.preventDefault();

    getNewFact();
  };

  return (
    <>
      <h1 className='text-center text-4xl font-semibold my-5'>Film liste</h1>

      {isLoading && <Loader />}
      {error && <Error />}

      <section>
        <label className='form-control w-full max-w-xs mb-10'>
          <div className='label'>
            <span className='label-text'>Søg på en film her</span>
          </div>
          <input
            type='search'
            placeholder='Søg film her...'
            onChange={(e) => {
              setSearchFilm(e.target.value);
            }}
            onKeyDown={(e) => {
              handleSearchKeyDown(e);
            }}
            className='input input-bordered w-full max-w-xs'
          />
        </label>
        <article className='grid grid-cols-1 text-center gap-y-10 md:text-justify sm:grid-cols-2 sm:gap-x-4 lg:grid-cols-3'>
          {data &&
            data.titleResults.results.map((f, index) => (
              <div className='card card-compact w-96 shadow-xl bg-base-100 mx-auto sm:w-fit' key={index}>
                <figure className='h-[730px]'>
                  <img className='object-contain' src={f.titlePosterImageModel?.url} alt='' />
                </figure>
                <article className='card-body shadow-xl'>
                  <h2 className='card-title'>
                    {f.titleNameText}
                    {data.titleResults.results.titleReleaseText && <span className='text-center text-sm italic my-6 capitalize'>({f.titleReleaseText})</span>}
                  </h2>
                  <div className='card-body'>
                    <div>
                      <p>Inkluderet:</p>
                      {f.topCredits &&
                        f.topCredits.map((credit, creditIndex) => (
                          <div key={creditIndex}>
                            <p>{credit}</p>
                          </div>
                        ))}
                      <p className='italic text-gray-400 text-sm'>{f.titleReleaseText}</p>
                    </div>
                  </div>
                  <div className='card-actions justify-end'>
                    <Link className='btn btn-primary' href='' rel='noreferrer'>
                      Læs mere
                    </Link>
                  </div>
                </article>
              </div>
            ))}
        </article>
      </section>
    </>
  );
}
