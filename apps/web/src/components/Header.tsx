'use client';

import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import Image from 'next/image';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <nav className="bg-sky-500 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link to={'/'} className="text-white text-2xl font-bold">
            Logo
          </Link>

          <div className="lg:hidden">
            <button onClick={toggleNavbar} className="text-white">
              {isOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>

          <div className={`lg:flex ${isOpen ? 'block' : 'hidden'}`}>
            <Link to={'/login'} className="text-white mx-4">
              Log In
            </Link>
            <Link to={'/signup'} className="text-white mx-4">
              Sign Up
            </Link>
          </div>
        </div>
      </nav>

      <div className="relative">
        <Image
          src={
            'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
          }
          alt="Jumbotron Image"
          className="w-full h-full"
        />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white">
          <h1 className="text-4xl font-bold mb-4">Your Jumbotron Title</h1>
          <p className="text-lg">Your Jumbotron subtitle goes here.</p>
        </div>
      </div>
    </>
  );
};

export default Header;
