'use client';

// import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import Image from 'next/image';
import Link from 'next/link';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };


  return (
    <>
      <nav className="bg-sky-500 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link href={'/'} className="text-white text-2xl font-bold">
            Logo
          </Link>

          <div className="lg:hidden">
            <button onClick={toggleNavbar} className="text-white">
              {isOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>

          <div className={`lg:flex ${isOpen ? 'block' : 'hidden'}`}>
            <Link href={'/login'} className="text-white mx-4">
              Log In
            </Link>
            <Link href={'/signup'} className="text-white mx-4">
              Sign Up
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
