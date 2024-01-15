import React from 'react';
import dynamic from 'next/dynamic';

export default function Map() {
  const MapWithNoSSR = dynamic(() => import('./Vejr_Map'), {
    ssr: false,
  });

  return (
    <div className='w-full h-96'>
      <MapWithNoSSR />
    </div>
  );
}
