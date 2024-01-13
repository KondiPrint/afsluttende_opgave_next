'use client';

import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { da } from 'date-fns/locale';
import Link from 'next/link';

const News_alt = ({ data }) => {
  return (
    <>
      <div className='grid grid-cols-3 gap-10'>
        {data &&
          data.articles.map((n, index) => (
            <div className='card card-compact w-96 shadow-xl bg-base-100' key={index}>
              <figure className='card max-h-72 flex justify-center'>
                <img className='object-cover h-64' src={n.urlToImage} alt='News-picture' />
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
export default News_alt;
