import React from 'react';

export default function AntalPerSide({ setAntalPerSide, setCurrentSide, options = [10, 20, 50, 100] }) {
  return (
    <>
      <label className='form-control w-full max-w-xs'>
        <div className='label'>
          <span className='label-text'>Antal per side</span>
        </div>
        <select className='select select-bordered w-fit' defaultValue='10'>
          {options.map((o) => (
            <option
              key={o}
              onClick={() => {
                setAntalPerSide(o);
                setCurrentSide(0);
              }}>
              {o}
            </option>
          ))}
        </select>
      </label>
    </>
  );
}
