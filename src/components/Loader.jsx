import React, { useEffect } from 'react';
import './loader.css';

export default function Loader() {
  useEffect(() => {
    document.querySelector('dialog').showModal();
  }, []);
  return <dialog className='loader'></dialog>;
}
