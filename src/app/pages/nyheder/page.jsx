'use client';
import Loader from '@/components/Loader';
import Error from '@/components/Error';
import useRequestData from '@/components/hooks/useRequestData';
import Nyheder_kort from '@/components/Nyheder_kort';
import { useState, useEffect } from 'react';
import newsRequestParameter from '../../../../public/assets/newsapi_requestparameters.json';
import { FaSearch } from 'react-icons/fa';
import AntalPerSide from '@/components/AntalPerSide';
import PrevNext from '@/components/Prev_Next';

export default function Nyheder() {
  const { data, isLoading, error, makeRequest } = useRequestData();

  const [searchKey, setSearchKey] = useState('Food');
  const [langKey, setLangKey] = useState('en');
  const [sortKey, setSortKey] = useState('popularity');

  const [antalPerSide, setAntalPerSide] = useState(10);
  const [currentSide, setCurrentSide] = useState(0);

  const newsPara = newsRequestParameter;

  useEffect(() => {
    makeRequest(`https://newsapi.org/v2/everything?q=${searchKey}&language=${langKey}&sortBy=${sortKey}&apiKey=d7c190b4d390401895223a0ac6fe7794`, 'GET');
  }, [langKey, sortKey]);

  // * Håndter KeyDown (indtastning) i inputfeltet - hvis Enter = start søgning
  const handleSearchKeyDown = (e) => {
    if (e.key === 'Enter' || e.code === 'Enter') {
      handleSearch();
    }
  };

  // * Søgning i API'en
  const handleSearch = (e) => {
    e.preventDefault();
    makeRequest(`https://newsapi.org/v2/everything?q=${searchKey}&language=${langKey}&sortBy=${sortKey}&apiKey=d7c190b4d390401895223a0ac6fe7794`, 'GET');
  };

  let dataLength = data?.articles.length;

  return (
    <>
      <h1 className='text-center text-4xl font-semibold mb-8'>Nyheder</h1>

      {isLoading && <Loader />}
      {error && <Error />}

      <div className='mb-10 mx-auto w-11/12 sm:w-full'>
        <AntalPerSide setAntalPerSide={setAntalPerSide} setCurrentSide={setCurrentSide} />
        <form
          onSubmit={(e) => {
            handleSearch(e);
          }}
          className='mt-5 sm:flex sm:gap-2'>
          <div className='w-96 mx-auto sm:mx-0 sm:w-fit'>
            <div className='join'>
              <div>
                <input
                  type='search'
                  placeholder='Søg emne her...'
                  onChange={(e) => {
                    setSearchKey(e.target.value);
                  }}
                  onKeyDown={(e) => {
                    handleSearchKeyDown(e);
                  }}
                  className='input input-bordered join-item'
                />
              </div>
              <select defaultValue='Filter' name='sort' id='sort' className='select select-bordered join-item' onChange={(e) => setSortKey(e.target.value)}>
                <option disabled>Filter</option>
                <option value='popularity'>Populær</option>
                <option value='relevancy'>Relevance</option>
                <option value='publishedAt'>Udgivet</option>
              </select>
              <div className='indicator'>
                <button className='btn btn-neutral join-item'>
                  <FaSearch />
                </button>
              </div>
            </div>
          </div>

          <div className='w-fit mx-auto mt-3 sm:mx-0 sm:mt-0 sm:w-full'>
            <select value={langKey} name='lang' id='lang' className='btn btn-neutral w-fit' onChange={(e) => setLangKey(e.target.value)}>
              {newsPara &&
                newsPara.language.map((lan, index) => (
                  <option key={index} value={lan.code}>
                    {lan.language}
                  </option>
                ))}
            </select>
          </div>
        </form>
      </div>

      <Nyheder_kort data={data} setAntalPerSide={setAntalPerSide} setCurrentSide={setCurrentSide} antalPerSide={antalPerSide} currentSide={currentSide} />

      <div className='flex justify-center mt-5 md:mt-10'>
        <PrevNext setCurrentSide={setCurrentSide} currentSide={currentSide} dataLength={dataLength} antalPerSide={antalPerSide} data={data} />
      </div>
    </>
  );
}
