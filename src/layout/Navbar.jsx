import Link from 'next/link';

const Navbar = () => {
  return (
    <nav>
      <div className='flex justify-center'>
        <menu className='flex gap-5'>
          <Link href='/' className='hover:text-gray-200'>
            Home
          </Link>
          <Link href='/pages/energidata' className='hover:text-gray-200'>
            Energidata
          </Link>
          <Link href='/pages/nyheder' className='hover:text-gray-200'>
            Nyheder
          </Link>
          <Link href='/pages/vejret' className='hover:text-gray-200'>
            Vejret
          </Link>
          <Link href='/pages/viborgHaveService_1' className='hover:text-gray-200'>
            VHS
          </Link>
          <Link href='/pages/reviews' className='hover:text-gray-200'>
            Reviews
          </Link>
        </menu>
      </div>
    </nav>
  );
};

export default Navbar;
