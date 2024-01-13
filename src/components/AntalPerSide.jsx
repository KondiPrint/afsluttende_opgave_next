import React from 'react';

export default function AntalPerSide({ setAntalPerSide, setCurrentSide, options = [10, 20, 50, 100] }) {
  return (
    <div>
      {options.map((o) => (
        <button
          className='btn btn-neutral mr-5 last:mr-0'
          key={'btn' + o}
          onClick={() => {
            setAntalPerSide(o);
            setCurrentSide(0);
          }}>
          {o} pr. page
        </button>
      ))}
    </div>
  );
}
