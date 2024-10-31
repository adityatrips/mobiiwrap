import React from 'react';
import { brandName } from '@/app/constants';
const Footer = () => {
  return (
    <footer className='py-10 bg-white dark:bg-black text-center'>
      <p className='text-gray-700 dark:text-gray-300'>
        &copy; {new Date().getFullYear()} {brandName}. All rights reserved.
      </p>
      <div className='mt-4 flex justify-center space-x-6'>
        <a
          href='/about'
          className='text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition duration-300'
        >
          About
        </a>
        <a
          href='/products'
          className='text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition duration-300'
        >
          Products
        </a>
        <a
          href='/policies'
          className='text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition duration-300'
        >
          Policies
        </a>
        <a
          href='/faq'
          className='text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition duration-300'
        >
          FAQ
        </a>
        <a
          href='/contact-us'
          className='text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition duration-300'
        >
          Contact Us
        </a>
      </div>
    </footer>
  );
};

export default Footer;
{
  /* <footer className='py-10 bg-white dark:bg-black text-center'>
        <p className='text-gray-700 dark:text-gray-300'>
          &copy; {new Date().getFullYear()} {brandName}. All rights reserved.
        </p>
        <div className='mt-4 flex justify-center space-x-6'>
          <a
            href='/about'
            className='text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition duration-300'
          >
            About
          </a>
          <a
            href='/products'
            className='text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition duration-300'
          >
            Products
          </a>
          <a
            href='/policies'
            className='text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition duration-300'
          >
            Policies
          </a>
          <a
            href='/faq'
            className='text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition duration-300'
          >
            FAQ
          </a>
          <a
            href='/contact-us'
            className='text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition duration-300'
          >
            Contact Us
          </a>
        </div>
      </footer> */
}
