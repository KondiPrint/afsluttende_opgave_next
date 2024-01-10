import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className='bg-cyan-800'>
      <div className='container flex flex-auto'>
        <div>
          <a href='#' className='text-xl font-bold'>
            Logo
          </a>
        </div>

        <menu>
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
            VHS_1
          </Link>
          <Link href='/pages/viborgHaveService_2' className='hover:text-gray-200'>
            VHS_2
          </Link>
        </menu>
      </div>
    </nav>
  );
};

export default Navbar;
