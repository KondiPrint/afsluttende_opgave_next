import React from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

export default function PrevNext({ data, setCurrentSide, currentSide, dataLength, antalPerSide }) {
  const totalPages = Math.ceil(dataLength / antalPerSide);
  return (
    <>
      <div className='flex flex-col'>
        <div className='flex items-center justify-between px-4  sm:px-6'>
          <div className='hidden sm:flex sm:flex-1 sm:items-center sm:justify-between'>
            <div>
              <nav className='isolate inline-flex -space-x-px rounded-md shadow-sm' aria-label='Pagination'>
                <button className='px-5' onClick={() => setCurrentSide(currentSide - 1)} disabled={currentSide <= 0}>
                  <FaChevronLeft />
                </button>
                {Array.from({ length: totalPages }).map((f, index) => (
                  <p
                    key={index}
                    className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold cursor-pointer ${
                      currentSide === index ? 'text-white bg-indigo-600' : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 bg-white'
                    } ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0`}
                    onClick={() => setCurrentSide(index)}>
                    {index + 1}
                  </p>
                ))}
                <button className='px-5' onClick={() => setCurrentSide(currentSide + 1)} disabled={currentSide + 1 >= Math.ceil(dataLength / antalPerSide)}>
                  <FaChevronRight />
                </button>
              </nav>
            </div>
          </div>
        </div>
        <div className='text-center pt-2'>
          <p className='text-sm'>
            Viser <span className='font-medium'>{Math.min(currentSide * antalPerSide + 1, data?.limit || 0)}</span> til{' '}
            <span className='font-medium'>{Math.min((currentSide + 1) * antalPerSide, data?.limit || 0)}</span> af <span className='font-medium'>{data?.limit || 0}</span> resultater
          </p>
        </div>
      </div>
    </>
  );
}
