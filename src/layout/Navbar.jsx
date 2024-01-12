import Link from 'next/link';

const Navbar = () => {
  return (
    <>
      <nav className='navbar bg-green-800'>
        <div className='navbar-start'>
          <div className='dropdown'>
            <div tabIndex={0} role='button' className='btn btn-ghost lg:hidden'>
              <svg xmlns='http://www.w3.org/2000/svg' className='h-5 w-5' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M4 6h16M4 12h8m-8 6h16' />
              </svg>
            </div>
            <menu tabIndex={0} className='menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52'>
              <li>
                <Link href='/' className='hover:text-gray-200'>
                  Home
                </Link>
              </li>
              <li>
                <Link href='/pages/energidata' className='hover:text-gray-200'>
                  Energidata
                </Link>
              </li>
              <li>
                <Link href='/pages/nyheder' className='hover:text-gray-200'>
                  Nyheder
                </Link>
              </li>
              <li>
                <Link href='/pages/vejret' className='hover:text-gray-200'>
                  Vejret
                </Link>
              </li>
              <li>
                <details>
                  <summary>Viborg Haveservice</summary>
                  <menu className='p-2'>
                    <li>
                      <Link href='/pages/viborgHaveService_1'>Om os</Link>
                    </li>
                    <li>
                      <Link href='/pages/viborgHaveService_1/vhs_admin'>Admin</Link>
                    </li>
                  </menu>
                </details>
              </li>
              <li>
                <details>
                  <summary>Reviews</summary>
                  <menu className='p-2'>
                    <li>
                      <Link href='/pages/reviews'>Reviews</Link>
                    </li>
                    <li>
                      <Link href='/pages/reviews/reviews_admin'>Admin</Link>
                    </li>
                  </menu>
                </details>
              </li>
            </menu>
          </div>
        </div>

        <div className='navbar-center hidden lg:flex'>
          <menu className='menu menu-horizontal px-1'>
            <li>
              <Link href='/' className='hover:text-gray-200'>
                Home
              </Link>
            </li>
            <li>
              <Link href='/pages/energidata' className='hover:text-gray-200'>
                Energidata
              </Link>
            </li>
            <li>
              <Link href='/pages/nyheder' className='hover:text-gray-200'>
                Nyheder
              </Link>
            </li>
            <li>
              <Link href='/pages/vejret' className='hover:text-gray-200'>
                Vejret
              </Link>
            </li>
            <li>
              <details>
                <summary>Viborg Haveservice</summary>
                <menu className='p-2'>
                  <li>
                    <Link href='/pages/viborgHaveService_1'>Om os</Link>
                  </li>
                  <li>
                    <Link href='/pages/viborgHaveService_1/vhs_admin'>Admin</Link>
                  </li>
                </menu>
              </details>
            </li>
            <li>
              <details>
                <summary>Reviews</summary>
                <menu className='p-2'>
                  <li>
                    <Link href='/pages/reviews'>Reviews</Link>
                  </li>
                  <li>
                    <Link href='/pages/reviews/reviews_admin'>Admin</Link>
                  </li>
                </menu>
              </details>
            </li>
          </menu>
        </div>
        <div className='navbar-end'></div>
      </nav>
    </>
  );
};

export default Navbar;
