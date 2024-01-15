'use client';
import Loader from '@/components/Loader';
import Error from '@/components/Error';
import useRequestData from '@/components/hooks/useRequestData';
import Link from 'next/link';

export default function Home() {
  const { data, isLoading, error, makeRequest } = useRequestData();

  return (
    <>
      <h1 className='text-center text-4xl font-semibold my-10'>Home</h1>
      {isLoading && <Loader />}
      {error && <Error />}

      <section className='min-h-full'>
        <div className='flex justify-center gap-20 flex-wrap'>
          <div>
            <Link href={'/pages/energidata'}>
              <p className='text-center'>Energidata</p>
              <img className='scale-95 hover:scale-110 transition-all duration-500' src='../../images/eksperimentarium.png' alt='Eksperimentarium' />
            </Link>
          </div>
          <div>
            <p className='text-center'>Nyheder</p>
            <Link href={'/pages/nyheder'}>
              <div className='scale-95 hover:scale-110 transition-all duration-500 bg-blue-700 h-[385.99px] w-[158.01px] rounded-badge'></div>
            </Link>
          </div>
          <div>
            <p className='text-center'>Vejret</p>
            <Link href={'/pages/vejret'}>
              <img className='scale-95 hover:scale-110 transition-all duration-500' src='../../images/nature.png' alt='Grønne områder' />
            </Link>
          </div>
          <div>
            <p className='text-center'>Reviews</p>
            <Link href={'/pages/reviews'}>
              <div className='scale-95 hover:scale-110 transition-all duration-500 bg-green-700 h-[385.99px] w-[158.01px] rounded-badge'></div>
            </Link>
          </div>
          <div>
            <p className='text-center hover:opacity-0'>Viborg Haveservice</p>
            <Link href={'/pages/viborgHaveService_1'}>
              <img className='scale-95 hover:scale-110 transition-all duration-500' src='../../images/tinyhouse.png' alt='Tiny Houses' />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
