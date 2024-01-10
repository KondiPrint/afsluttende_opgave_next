import React, { useEffect } from 'react';
import './loader.css';

const Loader = () => {
  useEffect(() => {
    document.querySelector('dialog').showModal();
  }, []);
  return <dialog className='loader'></dialog>;
};

export default Loader;
