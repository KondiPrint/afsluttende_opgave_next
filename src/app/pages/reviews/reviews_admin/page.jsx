'use client';

import { useEffect } from 'react';
import Loader from '@/components/Loader';
import Error from '@/components/Error';
import useRequestData from '@/components/hooks/useRequestData';
import Link from 'next/link';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';

const ReviewAdmin = () => {
  const { data, isLoading, error, makeRequest } = useRequestData();
  const { data: dataDelete, isLoading: isLoadingDelete, error: errorDelete, makeRequest: makeRequestDelete } = useRequestData();

  useEffect(() => {
    makeRequest('http://localhost:5023/reviews');
  }, []);

  const handleDelete = (reviewID, reviewAuthor) => {
    if (window.confirm(`Er du sikker på du gerne vil fjerne review af: ${reviewAuthor}?`)) {
      makeRequestDelete(`http://localhost:5023/reviews/admin/${reviewID}`, 'DELETE');
    }
  };

  return (
    <>
      <h1 className='text-center text-4xl font-semibold my-5'>Her kan du redigere i reviews</h1>
      <div>
        {isLoading && <Loader />}
        {error && <h2>Error ...</h2>}

        <div className='overflow-x-auto'>
          <table className='table table-zebra'>
            <thead>
              <tr>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th className='text-right'>
                  <Link className='w-fit btn btn-primary' href={`/pages/reviews/reviews_create`}>
                    <FaPlus size='1.5em' />
                  </Link>
                </th>
              </tr>
              <tr>
                <th>#</th>
                <th>ID</th>
                <th>Forfatter</th>
                <th>Rediger</th>
                <th>Slet</th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data.map((r, index) => (
                  <tr key={r._id}>
                    <th>{index + 1}</th>
                    <td className='flex break-all'>{r._id}</td>
                    <td>{r.author}</td>
                    <td>
                      <Link
                        href={{
                          pathname: `/pages/reviews/reviews_edit`,
                          query: { id: r._id },
                        }}>
                        <FaEdit size='2em' color='darkgreen' className='hover:fill-green-500' />
                      </Link>
                    </td>
                    <td>
                      <FaTrash className='cursor-pointer hover:fill-red-500' onClick={() => handleDelete(r._id, r.author)} size='2em' color='darkred' />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ReviewAdmin;
