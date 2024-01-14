'use client';

import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { da } from 'date-fns/locale';
import Link from 'next/link';

const Nyheder_kort = ({ data, currentSide, antalPerSide }) => {
  const sliceData = (dataToSlice) => {
    return dataToSlice.slice(currentSide * antalPerSide, currentSide * antalPerSide + antalPerSide);
  };

  return (
    <>
      <div className='grid grid-cols-1 text-center gap-y-10 md:text-justify sm:grid-cols-2 sm:gap-x-4 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5'>
        {data &&
          sliceData(data?.articles).map((n, index) => (
            <div className='card card-compact w-96 shadow-xl bg-base-100 mx-auto sm:w-fit' key={index}>
              <figure>
                <img className='object-cover' src={n.urlToImage} alt='News-picture' />
              </figure>
              <div className='card-body'>
                <h2 className='card-title'>{n.title}</h2>
                <div>
                  <p>{n.author}</p>
                  <p className='italic text-gray-400 text-sm' dateTime={n.publishedAt}>
                    {new Date(n.publishedAt).toLocaleString('da', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: '2-digit' })}
                  </p>
                  <p className='italic text-gray-400 text-sm'>{formatDistanceToNow(new Date(n.publishedAt), { locale: da, addSuffix: true })}</p>
                </div>
                <p>{n.content}</p>
              </div>
              <div className='card-actions justify-end'>
                <Link className='btn btn-primary' href={n.url} target='_blank' rel='noreferrer'>
                  Læs mere
                </Link>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};
export default Nyheder_kort;
