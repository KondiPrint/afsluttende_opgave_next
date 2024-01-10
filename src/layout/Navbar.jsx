import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className='text-white bg-sky-700 py-4'>
      <div className='container flex items-center justify-between px-4 mx-auto'>
        <div>
          <a href='#' className='text-xl font-bold'>
            Logo
          </a>
        </div>

        <div>
          <Link href='/' className='hover:text-gray-200'>
            Home
          </Link>
          <Link href='/pages/about' className='hover:text-gray-200'>
            Om os
          </Link>
          <Link href='/pages/news' className='hover:text-gray-200'>
            Nyheder
          </Link>
          <Link href='/pages/contact' className='hover:text-gray-200'>
            Kontakt
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
