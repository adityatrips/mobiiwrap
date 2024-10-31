import React from 'react';
import { brandName } from '../constants';
import Image from 'next/image';
import { Phone, Headphones, Star } from 'lucide-react'; // Example icon imports from Lucide

const AboutPage = () => {
  return (
    <div className='flex flex-col gap-8 justify-center min-h-nav-full mx-auto container px-6 py-10 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 rounded-lg shadow-lg text-gray-800 dark:text-gray-100 transition-all duration-300'>
      {/* Header Section */}
      <div className='text-center'>
        <p className='text-xs text-primary uppercase tracking-widest font-semibold'>
          Why Choose Us?
        </p>
        <h2 className='text-4xl font-bold mt-2'>
          Make Your Customers Happy with Exceptional Service
        </h2>
      </div>

      {/* Introduction Section */}
      <div className='text-center text-gray-600 dark:text-gray-400'>
        <p className='text-lg'>
          Founded in 2019 in Karol Bagh’s bustling Gaffar Market,{' '}
          <strong>{brandName}</strong> has quickly become the top destination
          for superior quality wrapping services, offering high-end device skins
          for phones, earphones, and more.
        </p>
      </div>

      {/* Founder Section */}
      <div className='flex flex-col md:flex-row items-center gap-6 mt-6'>
        <div className='flex-1 text-base leading-relaxed'>
          <p>
            I’m <strong>Shubham Khandelwal</strong>, and this is{' '}
            <strong>{brandName}</strong>. We’re passionate about “wrapping.” Our
            goal is to lead globally in custom wrapping solutions, transforming
            everyday items into unique, tailored masterpieces.
          </p>
          <p className='mt-4'>
            Our mission is to bring creativity and personalization to your
            devices. We believe every item deserves a unique touch that reflects
            your personality and style.
          </p>
        </div>
        {/* <Image
          alt='Founder Image'
          src='/path/to/founder-image.jpg'
          width={200}
          height={200}
          className='rounded-full shadow-lg'
        /> */}
      </div>

      {/* Service Highlights Section */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-8 mt-8'>
        <div className='flex flex-col items-center bg-white dark:bg-gray-800 rounded-lg shadow-md p-6'>
          <Phone className='text-4xl text-primary mb-4 dark:text-white' />
          <h3 className='text-lg font-semibold text-gray-800 dark:text-gray-100'>
            Mobile Phone Skins
          </h3>
          <p className='text-center text-gray-600 dark:text-gray-400'>
            Transform your phone with our stunning skins that offer both style
            and protection, without the bulk of traditional cases.
          </p>
        </div>

        <div className='flex flex-col items-center bg-white dark:bg-gray-800 rounded-lg shadow-md p-6'>
          <Headphones className='text-4xl text-primary mb-4 dark:text-white' />
          <h3 className='text-lg font-semibold text-gray-800 dark:text-gray-100'>
            Earphone Skins
          </h3>
          <p className='text-center text-gray-600 dark:text-gray-400'>
            Elevate your earphones with our unique designs that make a statement
            while safeguarding your devices.
          </p>
        </div>

        <div className='flex flex-col items-center bg-white dark:bg-gray-800 rounded-lg shadow-md p-6'>
          <Star className='text-4xl text-primary mb-4 dark:text-white' />
          <h3 className='text-lg font-semibold text-gray-800 dark:text-gray-100'>
            Quality Assurance
          </h3>
          <p className='text-center text-gray-600 dark:text-gray-400'>
            Each product undergoes rigorous quality checks to ensure you receive
            nothing but the best.
          </p>
        </div>
      </div>

      {/* Conclusion Section */}
      <div className='text-center mt-10'>
        <h3 className='text-2xl font-bold mb-4'>Join Our Journey!</h3>
        <p>
          At <strong>{brandName}</strong>, we believe that with the right wrap,
          anything is possible. Dive into our collection today and discover the
          transformation that awaits your devices. Let’s give everything a
          fresh, customized look together!
        </p>
      </div>
    </div>
  );
};

export default AboutPage;

// import React from 'react';
// import { brandName } from '../constants';
// import Image from 'next/image';
// import {
//   Home32Filled,
//   Phone32Filled,
//   Headphones32Filled,
//   Star32Filled,
// } from '@fluentui/react-icons';

// const AboutPage = () => {
//   return (
//     <div className='flex flex-col gap-8 justify-center min-h-nav-full mx-auto container px-6 py-10 bg-gradient-to-b from-gray-50 to-gray-100 rounded-lg shadow-lg text-gray-800 dark:text-gray-100 dark:from-gray-900 dark:to-gray-800 transition-all duration-300'>
//       {/* Header Section */}
//       <div className='text-center'>
//         <p className='text-xs text-primary uppercase tracking-widest font-semibold'>
//           Why Choose Us?
//         </p>
//         <h2 className='text-4xl font-bold mt-2'>
//           Make Your Customers Happy with Exceptional Service
//         </h2>
//       </div>

//       {/* Introduction Section */}
//       <div className='text-center text-gray-600 dark:text-gray-400'>
//         <p className='text-lg'>
//           Founded in 2019 in Karol Bagh’s bustling Gaffar Market,{' '}
//           <strong>{brandName}</strong> has quickly become the top destination
//           for superior quality wrapping services, offering high-end device skins
//           for phones, earphones, and more.
//         </p>
//       </div>

//       {/* Founder Section */}
//       <div className='flex flex-col md:flex-row items-center gap-6 mt-6'>
//         <div className='flex-1 text-base leading-relaxed'>
//           <p>
//             I’m <strong>Shubham Khandelwal</strong>, and this is{' '}
//             <strong>{brandName}</strong>. We’re passionate about “wrapping.” Our
//             goal is to lead globally in custom wrapping solutions, transforming
//             everyday items into unique, tailored masterpieces.
//           </p>
//           <p className='mt-4'>
//             Our mission is to bring creativity and personalization to your
//             devices. We believe every item deserves a unique touch that reflects
//             your personality and style.
//           </p>
//         </div>
//         <Image
//           alt='Founder Image'
//           src='/path/to/founder-image.jpg'
//           width={200}
//           height={200}
//           className='rounded-full shadow-lg'
//         />
//       </div>

//       {/* Service Highlights Section */}
//       <div className='grid grid-cols-1 md:grid-cols-3 gap-8 mt-8'>
//         <div className='flex flex-col items-center bg-white rounded-lg shadow-md p-6 transition-transform hover:scale-105'>
//           <Phone32Filled className='h-10 w-10 text-primary mb-4' />
//           <h3 className='text-lg font-semibold'>Mobile Phone Skins</h3>
//           <p className='text-center text-gray-600 dark:text-gray-400'>
//             Transform your phone with our stunning skins that offer both style
//             and protection, without the bulk of traditional cases.
//           </p>
//         </div>

//         <div className='flex flex-col items-center bg-white rounded-lg shadow-md p-6 transition-transform hover:scale-105'>
//           <Headphones32Filled className='h-10 w-10 text-primary mb-4' />
//           <h3 className='text-lg font-semibold'>Earphone Skins</h3>
//           <p className='text-center text-gray-600 dark:text-gray-400'>
//             Elevate your earphones with our unique designs that make a statement
//             while safeguarding your devices.
//           </p>
//         </div>

//         <div className='flex flex-col items-center bg-white rounded-lg shadow-md p-6 transition-transform hover:scale-105'>
//           <Star32Filled className='h-10 w-10 text-primary mb-4' />
//           <h3 className='text-lg font-semibold'>Quality Assurance</h3>
//           <p className='text-center text-gray-600 dark:text-gray-400'>
//             Each product undergoes rigorous quality checks to ensure you receive
//             nothing but the best.
//           </p>
//         </div>
//       </div>

//       {/* Conclusion Section */}
//       <div className='text-center mt-10'>
//         <h3 className='text-2xl font-bold mb-4'>Join Our Journey!</h3>
//         <p>
//           At <strong>{brandName}</strong>, we believe that with the right wrap,
//           anything is possible. Dive into our collection today and discover the
//           transformation that awaits your devices. Let’s give everything a
//           fresh, customized look together!
//         </p>
//       </div>
//     </div>
//   );
// };

// export default AboutPage;
// // import React from "react";
// // import { brandName } from "../constants";

// // const AboutPage = () => {
// //   return (
// //     <div className="flex flex-col gap-2 justify-center min-h-nav-full mx-auto container">
// //       <p className="text-sm text-primary uppercase tracking-widest">
// //         Why Choose Us?
// //       </p>
// //       <h2>Make your customers happy by giving services.</h2>
// //       <p>
// //         Founded in 2019 and nestled in the bustling Gaffar Market of Karol Bagh,
// //         {brandName} is your go-to destination for top-quality wrapping services,
// //         including mobile phones, earphones, and other device skins. Renowned for
// //         our superior quality, excellent service, and impeccable finishing, we
// //         consistently strive to exceed your expectations.
// //       </p>
// //       <p>
// //         I&apos;m Shubham Khandelwal, this is {brandName}, and we love
// //         “wrapping”. Our vision is to become a global leader in wrapping
// //         solutions. We are dedicated to offering customized wrapping options for
// //         everything, transforming everyday items into unique, personalized pieces
// //         tailored to your preferences.
// //       </p>
// //       <p>
// //         Our range of skins includes mobile phone skins, earphone skins, and a
// //         lot more. Each product is crafted to provide a fresh, customized look
// //         while offering protection and style.
// //       </p>
// //       <p>
// //         Join us on our journey to give everything a fresh, customized look. At
// //         {brandName}, we believe that with the right wrap, anything is possible.
// //         Explore our skins collection today and discover how we can transform
// //         your devices into unique, personalized masterpieces.
// //       </p>
// //     </div>
// //   );
// // };

// // export default AboutPage;
