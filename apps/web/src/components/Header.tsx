'use client';

// import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import Image from 'next/image';
import Link from 'next/link';
import SearchBar from './SearchBar';
import { useRouter } from 'next/navigation';
import axios from 'axios';

interface header {
  cookie: string | undefined;
}

const apiSignout = 'http://localhost:9296/api/auth/signout';

const Header = (props: header) => {
  const cookie = props.cookie;
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const router = useRouter();
  // const handeSignout = () => {
  const userSignout = async () => {
    const res = await axios.post(
      apiSignout,
      {},
      {
        withCredentials: true,
      },
    );
    router.push('/');
    router.refresh();
  };
  // };

  return (
    <>
      <nav className="bg-sky-500 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link href={'/'} className="text-white text-2xl font-bold">
            Logo
          </Link>
          <div>
            <SearchBar />
          </div>

          <div className="lg:hidden">
            <button onClick={toggleNavbar} className="text-white">
              {isOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>

          <div className={`lg:flex ${isOpen ? 'block' : 'hidden'}`}>
            {cookie ? null : (
              <div>
                <Link href={'/login'} className="text-white mx-4">
                  Log In
                </Link>
                <Link href={'/signup'} className="text-white mx-4">
                  Sign Up
                </Link>
              </div>
            )}
            {!cookie ? null : (
              <div>
                <Link
                  href={'/'}
                  className="text-white mx-4"
                  onClick={userSignout}
                >
                  Log Out
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
