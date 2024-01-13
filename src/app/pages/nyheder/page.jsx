'use client';
import Loader from '@/components/Loader';
import Error from '@/components/Error';
import useRequestData from '@/components/hooks/useRequestData';
import News_alt from '@/components/News_everything';
import { useState, useEffect } from 'react';
import newsRequestParameter from '../../../../public/assets/newsapi_requestparameters.json';
import { FaSearch } from 'react-icons/fa';

export default function Nyheder() {
  const { data, isLoading, error, makeRequest } = useRequestData();

  const [searchKey, setSearchKey] = useState('Food');
  const [langKey, setLangKey] = useState('en');
  const [sortKey, setSortKey] = useState('popularity');

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

  return (
    <>
      <h1 className='text-center text-4xl font-semibold mt-10 mb-20'>Nyheder</h1>

      {isLoading && <Loader />}
      {error && <Error />}

      <form
        onSubmit={(e) => {
          handleSearch(e);
        }}
        className='mb-10'>
        <div className='join'>
          <div>
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

        <select value={langKey} name='lang' id='lang' className='btn btn-neutral ml-5' onChange={(e) => setLangKey(e.target.value)}>
          {newsPara &&
            newsPara.language.map((lan, index) => (
              <option key={index} value={lan.code}>
                {lan.language}
              </option>
            ))}
        </select>
      </form>

      <News_alt data={data} />
    </>
  );
}
