'use client';

import { ThemeSliceState } from '@/types';
import Image from 'next/image';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { brandName } from './constants';
import { ShoppingCart, Phone, ShieldCheck } from 'lucide-react'; // Importing icons

const IndexPage = () => {
  const { isDark } = useSelector((state: ThemeSliceState) => state.theme);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <div className='bg-white dark:bg-black transition-all duration-300 font-sans'>
      {/* Hero Section */}
      <section className='flex flex-col justify-center items-center h-screen relative text-center px-4'>
        <h1 className='tracking-wider uppercase text-5xl md:text-6xl font-extrabold text-black dark:text-white mb-6'>
          {brandName}
        </h1>
        <p className='mb-12 text-lg max-w-2xl text-gray-800 dark:text-gray-300 leading-relaxed'>
          Welcome to {brandName}! Discover premium mobile wraps and cases that
          offer both style and protection for your devices.
        </p>
        <a
          href='/products'
          className='bg-black text-white dark:bg-white dark:text-black py-3 px-8 rounded-full shadow-lg hover:bg-gray-700 dark:hover:bg-gray-300 transition duration-300 text-lg'
        >
          Shop Now
        </a>
      </section>

      {/* Features Section */}
      <section className='py-20 container mx-auto text-center'>
        <h2 className='text-3xl font-bold mb-10 text-black dark:text-white'>
          Why Choose Us?
        </h2>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-10'>
          <div className='bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300'>
            <ShoppingCart className='mx-auto mb-4 h-10 w-10 text-black dark:text-white' />
            <h3 className='text-xl font-semibold text-black dark:text-white'>
              Wide Selection
            </h3>
            <p className='mt-2 text-gray-700 dark:text-gray-300'>
              Explore a wide variety of designs and styles to match your
              personality.
            </p>
          </div>
          <div className='bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300'>
            <Phone className='mx-auto mb-4 h-10 w-10 text-black dark:text-white' />
            <h3 className='text-xl font-semibold text-black dark:text-white'>
              Top-Notch Quality
            </h3>
            <p className='mt-2 text-gray-700 dark:text-gray-300'>
              Our products are made with attention to detail, ensuring both
              durability and style.
            </p>
          </div>
          <div className='bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300'>
            <ShieldCheck className='mx-auto mb-4 h-10 w-10 text-black dark:text-white' />
            <h3 className='text-xl font-semibold text-black dark:text-white'>
              Satisfaction Guaranteed
            </h3>
            <p className='mt-2 text-gray-700 dark:text-gray-300'>
              We stand behind our products, ensuring your satisfaction with
              every purchase.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className='py-20 bg-white dark:bg-black'>
        <div className='container mx-auto text-center'>
          <h2 className='text-3xl font-bold mb-10 text-black dark:text-white'>
            What Our Customers Say
          </h2>
          <div className='flex flex-col md:flex-row justify-center gap-6'>
            <div className='bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg max-w-xs'>
              <p className='italic text-gray-700 dark:text-gray-300'>
                "I absolutely love my new phone wrap! It's a perfect fit and
                looks amazing!"
              </p>
              <p className='mt-4 font-semibold text-black dark:text-white'>
                - Priya S.
              </p>
            </div>
            <div className='bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg max-w-xs'>
              <p className='italic text-gray-700 dark:text-gray-300'>
                "The quality is fantastic, and I was impressed with the fast
                shipping."
              </p>
              <p className='mt-4 font-semibold text-black dark:text-white'>
                - Rajesh M.
              </p>
            </div>
            <div className='bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg max-w-xs'>
              <p className='italic text-gray-700 dark:text-gray-300'>
                "So many design options! I found the perfect wrap to match my
                style."
              </p>
              <p className='mt-4 font-semibold text-black dark:text-white'>
                - Sneha K.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className='py-20'>
        <div className='container mx-auto text-center'>
          <h2 className='text-3xl font-bold mb-6 text-black dark:text-white'>
            Ready to Customize Your Device?
          </h2>
          <p className='mb-8 text-gray-700 dark:text-gray-300'>
            Explore our collection and give your device a fresh, new look today!
          </p>
          <a
            href='/products'
            className='bg-black text-white dark:bg-white dark:text-black py-3 px-8 rounded-full shadow-lg hover:bg-gray-700 dark:hover:bg-gray-300 transition duration-300 text-lg'
          >
            Shop Now
          </a>
        </div>
      </section>

      {/* Footer Section */}
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
    </div>
  );
};

export default IndexPage;

// 'use client';

// import { ThemeSliceState } from '@/types';
// import Image from 'next/image';
// import { useEffect } from 'react';
// import { useSelector } from 'react-redux';
// import { brandName } from './constants';
// import { ShoppingCart, Phone, ShieldCheck } from 'lucide-react'; // Importing icons

// const IndexPage = () => {
//   const { isDark } = useSelector((state: ThemeSliceState) => state.theme);

//   useEffect(() => {
//     if (isDark) {
//       document.documentElement.classList.add('dark');
//     } else {
//       document.documentElement.classList.remove('dark');
//     }
//   }, [isDark]);

//   return (
//     <div className='bg-white dark:bg-gray-900 transition-all duration-300 font-sans'>
//       {/* Hero Section */}
//       <section className='flex flex-col justify-center items-center h-screen relative text-center px-4'>
//         <h1 className='tracking-wider uppercase text-5xl md:text-6xl font-extrabold text-gray-900 dark:text-white mb-6'>
//           {brandName}
//         </h1>
//         <p className='mb-12 text-lg max-w-2xl text-gray-700 dark:text-gray-300 leading-relaxed'>
//           Welcome to {brandName}! Discover premium mobile wraps and cases that
//           offer both style and protection for your devices.
//         </p>
//         <a
//           href='/products'
//           className='bg-black text-white dark:bg-white dark:text-black py-3 px-8 rounded-full shadow-lg hover:bg-gray-800 dark:hover:bg-gray-300 transition duration-300 text-lg'
//         >
//           Shop Now
//         </a>
//       </section>

//       {/* Features Section */}
//       <section className='py-24 bg-gray-50 dark:bg-gray-800'>
//         <div className='container mx-auto text-center'>
//           <h2 className='text-4xl font-bold mb-12 text-gray-900 dark:text-white'>
//             Why Choose Us?
//           </h2>
//           <div className='grid grid-cols-1 md:grid-cols-3 gap-12'>
//             <div className='bg-white dark:bg-gray-700 p-8 rounded-lg shadow-md hover:shadow-xl transition duration-300'>
//               <ShoppingCart className='mx-auto mb-6 h-10 w-10 text-black dark:text-white' />
//               <h3 className='text-2xl font-semibold text-gray-900 dark:text-white'>
//                 Wide Selection
//               </h3>
//               <p className='mt-4 text-gray-600 dark:text-gray-300'>
//                 Browse an extensive variety of designs and styles to suit any
//                 personality or device.
//               </p>
//             </div>
//             <div className='bg-white dark:bg-gray-700 p-8 rounded-lg shadow-md hover:shadow-xl transition duration-300'>
//               <Phone className='mx-auto mb-6 h-10 w-10 text-black dark:text-white' />
//               <h3 className='text-2xl font-semibold text-gray-900 dark:text-white'>
//                 Premium Quality
//               </h3>
//               <p className='mt-4 text-gray-600 dark:text-gray-300'>
//                 Our wraps and cases are crafted with precision, offering
//                 long-lasting durability.
//               </p>
//             </div>
//             <div className='bg-white dark:bg-gray-700 p-8 rounded-lg shadow-md hover:shadow-xl transition duration-300'>
//               <ShieldCheck className='mx-auto mb-6 h-10 w-10 text-black dark:text-white' />
//               <h3 className='text-2xl font-semibold text-gray-900 dark:text-white'>
//                 Satisfaction Guaranteed
//               </h3>
//               <p className='mt-4 text-gray-600 dark:text-gray-300'>
//                 We back our products with excellent customer service and
//                 guarantee your satisfaction.
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Testimonials Section */}
//       <section className='py-24 bg-white dark:bg-gray-900'>
//         <div className='container mx-auto text-center'>
//           <h2 className='text-4xl font-bold mb-12 text-gray-900 dark:text-white'>
//             What Our Customers Say
//           </h2>
//           <div className='grid grid-cols-1 md:grid-cols-3 gap-12'>
//             <div className='bg-gray-50 dark:bg-gray-800 p-8 rounded-lg shadow-md hover:shadow-lg transition duration-300'>
//               <p className='italic text-gray-700 dark:text-gray-300'>
//                 "Mujhe mera naya phone wrap bahut pasand hai! Yeh perfect fit
//                 hai aur bahut acha lagta hai!"
//               </p>
//               <p className='mt-6 font-semibold text-gray-900 dark:text-white'>
//                 - Priya S.
//               </p>
//             </div>
//             <div className='bg-gray-50 dark:bg-gray-800 p-8 rounded-lg shadow-md hover:shadow-lg transition duration-300'>
//               <p className='italic text-gray-700 dark:text-gray-300'>
//                 "Quality bahut achi hai, aur mujhe fast shipping bhi pasand
//                 aayi."
//               </p>
//               <p className='mt-6 font-semibold text-gray-900 dark:text-white'>
//                 - Rajesh M.
//               </p>
//             </div>
//             <div className='bg-gray-50 dark:bg-gray-800 p-8 rounded-lg shadow-md hover:shadow-lg transition duration-300'>
//               <p className='italic text-gray-700 dark:text-gray-300'>
//                 "Itne design options hain! Maine apne style ke liye perfect wrap
//                 dhunda."
//               </p>
//               <p className='mt-6 font-semibold text-gray-900 dark:text-white'>
//                 - Sneha K.
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Call to Action Section */}
//       <section className='py-24 bg-gray-100 dark:bg-gray-800'>
//         <div className='container mx-auto text-center'>
//           <h2 className='text-4xl font-bold mb-8 text-gray-900 dark:text-white'>
//             Ready to Customize Your Device?
//           </h2>
//           <p className='mb-8 text-lg text-gray-600 dark:text-gray-300'>
//             Dive into our collection and give your devices a personalized
//             upgrade today!
//           </p>
//           <a
//             href='/products'
//             className='bg-black text-white dark:bg-white dark:text-black py-3 px-8 rounded-full shadow-lg hover:bg-gray-800 dark:hover:bg-gray-300 transition duration-300 text-lg'
//           >
//             Shop Now
//           </a>
//         </div>
//       </section>

//       {/* Footer Section */}
//       <footer className='py-12 bg-gray-900 dark:bg-gray-800 text-center text-gray-400'>
//         <p className='mb-4'>
//           &copy; {new Date().getFullYear()} {brandName}. All rights reserved.
//         </p>
//         <div className='flex justify-center space-x-6'>
//           <a href='/about' className='hover:text-white transition duration-300'>
//             About
//           </a>
//           <a
//             href='/products'
//             className='hover:text-white transition duration-300'
//           >
//             Products
//           </a>
//           <a
//             href='/policies'
//             className='hover:text-white transition duration-300'
//           >
//             Policies
//           </a>
//           <a href='/faq' className='hover:text-white transition duration-300'>
//             FAQ
//           </a>
//           <a
//             href='/contact-us'
//             className='hover:text-white transition duration-300'
//           >
//             Contact Us
//           </a>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default IndexPage;

// // 'use client';

// // import { ThemeSliceState } from '@/types';
// // import Image from 'next/image';
// // import { useEffect } from 'react';
// // import { useSelector } from 'react-redux';
// // import { brandName } from './constants';
// // import { ShoppingCart, Phone, ShieldCheck } from 'lucide-react'; // Importing relevant icons

// // const IndexPage = () => {
// //   const { isDark } = useSelector((state: ThemeSliceState) => state.theme);

// //   useEffect(() => {
// //     if (isDark) {
// //       document.documentElement.classList.add('dark');
// //     } else {
// //       document.documentElement.classList.remove('dark');
// //     }
// //   }, [isDark]);

// //   return (
// //     <div className={`bg-white dark:bg-black transition-all duration-300`}>
// //       {/* Hero Section */}
// //       <section className='flex flex-col justify-center items-center h-screen relative'>
// //         <h1 className='tracking-widest uppercase text-4xl md:text-5xl font-bold text-black dark:text-white mb-4'>
// //           {brandName}
// //         </h1>
// //         <p className='mb-10 text-center mx-auto max-w-[80%] text-gray-800 dark:text-gray-200'>
// //           Welcome to {brandName}! We provide high-quality mobile phone wraps and
// //           cases for your devices.
// //         </p>
// //         <a
// //           href='/products'
// //           className='bg-black text-white dark:bg-white dark:text-black py-2 px-6 rounded-lg shadow-md hover:bg-gray-800 dark:hover:bg-gray-300 transition duration-300'
// //         >
// //           Shop Now
// //         </a>
// //       </section>

// //       {/* Features Section */}
// //       <section className='py-20 container mx-auto text-center'>
// //         <h2 className='text-3xl font-bold mb-10 text-black dark:text-white'>
// //           Why Choose Us?
// //         </h2>
// //         <div className='grid grid-cols-1 md:grid-cols-3 gap-10'>
// //           <div className='bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md transition duration-300 hover:shadow-xl'>
// //             <ShoppingCart className='mx-auto mb-4 h-8 w-8 text-black dark:text-white' />
// //             <h3 className='text-xl font-semibold text-black dark:text-white'>
// //               Wide Selection
// //             </h3>
// //             <p className='mt-2 text-gray-800 dark:text-gray-200'>
// //               Explore a variety of designs and styles to suit your taste.
// //             </p>
// //           </div>
// //           <div className='bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md transition duration-300 hover:shadow-xl'>
// //             <Phone className='mx-auto mb-4 h-8 w-8 text-black dark:text-white' />
// //             <h3 className='text-xl font-semibold text-black dark:text-white'>
// //               Top-Notch Quality
// //             </h3>
// //             <p className='mt-2 text-gray-800 dark:text-gray-200'>
// //               Our products are crafted with care, ensuring durability and style.
// //             </p>
// //           </div>
// //           <div className='bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md transition duration-300 hover:shadow-xl'>
// //             <ShieldCheck className='mx-auto mb-4 h-8 w-8 text-black dark:text-white' />
// //             <h3 className='text-xl font-semibold text-black dark:text-white'>
// //               Satisfaction Guaranteed
// //             </h3>
// //             <p className='mt-2 text-gray-800 dark:text-gray-200'>
// //               We stand behind our products, providing you peace of mind with
// //               every purchase.
// //             </p>
// //           </div>
// //         </div>
// //       </section>

// //       {/* Testimonials Section */}
// //       <section className='py-20 bg-white dark:bg-black'>
// //         <div className='container mx-auto text-center'>
// //           <h2 className='text-3xl font-bold mb-10 text-black dark:text-white'>
// //             What Our Customers Say
// //           </h2>
// //           <div className='flex flex-col md:flex-row justify-center gap-6'>
// //             <div className='bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md max-w-xs'>
// //               <p className='italic text-gray-800 dark:text-gray-200'>
// //                 "Mujhe mera naya phone wrap bahut pasand hai! Yeh perfect fit
// //                 hai aur bahut acha lagta hai!"
// //               </p>
// //               <p className='mt-4 font-semibold text-black dark:text-white'>
// //                 - Priya S.
// //               </p>
// //             </div>
// //             <div className='bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md max-w-xs'>
// //               <p className='italic text-gray-800 dark:text-gray-200'>
// //                 "Quality bahut achi hai, aur mujhe fast shipping bhi pasand
// //                 aayi."
// //               </p>
// //               <p className='mt-4 font-semibold text-black dark:text-white'>
// //                 - Rajesh M.
// //               </p>
// //             </div>
// //             <div className='bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md max-w-xs'>
// //               <p className='italic text-gray-800 dark:text-gray-200'>
// //                 "Itne design options hain! Maine apne style ke liye perfect wrap
// //                 dhunda."
// //               </p>
// //               <p className='mt-4 font-semibold text-black dark:text-white'>
// //                 - Sneha K.
// //               </p>
// //             </div>
// //           </div>
// //         </div>
// //       </section>

// //       {/* Call to Action Section */}
// //       <section className='py-20'>
// //         <div className='container mx-auto text-center'>
// //           <h2 className='text-3xl font-bold mb-6 text-black dark:text-white'>
// //             Ready to Customize Your Device?
// //           </h2>
// //           <p className='mb-8 text-gray-800 dark:text-gray-200'>
// //             Explore our collection and give your devices a fresh new look today!
// //           </p>
// //           <a
// //             href='/products'
// //             className='bg-black text-white dark:bg-white dark:text-black py-2 px-6 rounded-lg shadow-md hover:bg-gray-800 dark:hover:bg-gray-300 transition duration-300'
// //           >
// //             Shop Now
// //           </a>
// //         </div>
// //       </section>

// //       {/* Footer Section */}
// //       <footer className='py-10 bg-white dark:bg-black text-center'>
// //         <p className='text-gray-800 dark:text-gray-200'>
// //           &copy; {new Date().getFullYear()} {brandName}. All rights reserved.
// //         </p>
// //         <div className='mt-4 flex justify-center space-x-4'>
// //           <a
// //             href='/about'
// //             className='text-gray-800 dark:text-gray-200 hover:text-black dark:hover:text-white transition duration-300'
// //           >
// //             About
// //           </a>
// //           <a
// //             href='/products'
// //             className='text-gray-800 dark:text-gray-200 hover:text-black dark:hover:text-white transition duration-300'
// //           >
// //             Products
// //           </a>
// //           <a
// //             href='/policies'
// //             className='text-gray-800 dark:text-gray-200 hover:text-black dark:hover:text-white transition duration-300'
// //           >
// //             Policies
// //           </a>
// //           <a
// //             href='/faq'
// //             className='text-gray-800 dark:text-gray-200 hover:text-black dark:hover:text-white transition duration-300'
// //           >
// //             FAQ
// //           </a>
// //           <a
// //             href='/contact-us'
// //             className='text-gray-800 dark:text-gray-200 hover:text-black dark:hover:text-white transition duration-300'
// //           >
// //             Contact Us
// //           </a>
// //         </div>
// //       </footer>
// //     </div>
// //   );
// // };

// // export default IndexPage;

// // // 'use client';

// // // import { ThemeSliceState } from '@/types';
// // // import Image from 'next/image';
// // // import { useEffect } from 'react';
// // // import { useSelector } from 'react-redux';
// // // import { brandName } from './constants';
// // // import { ShoppingCart, Phone, ShieldCheck } from 'lucide-react'; // Importing relevant icons

// // // const IndexPage = () => {
// // //   const { isDark } = useSelector((state: ThemeSliceState) => state.theme);

// // //   useEffect(() => {
// // //     if (isDark) {
// // //       document.documentElement.classList.add('dark');
// // //     } else {
// // //       document.documentElement.classList.remove('dark');
// // //     }
// // //   }, [isDark]);

// // //   return (
// // //     <div className='bg-gray-50 dark:bg-gray-900 transition-all duration-300'>
// // //       {/* Hero Section */}
// // //       <section className='flex flex-col justify-center items-center h-screen relative'>
// // //         <h1 className='tracking-widest uppercase text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-4'>
// // //           {brandName}
// // //         </h1>
// // //         <p className='mb-10 text-center mx-auto max-w-[80%] text-gray-600 dark:text-gray-400'>
// // //           Welcome to {brandName}! We provide high-quality mobile phone wraps and
// // //           cases for your devices.
// // //         </p>
// // //         <a
// // //           href='/products'
// // //           className='bg-primary text-white dark:text-black py-2 px-6 rounded-lg shadow-md hover:bg-primary-dark transition duration-300'
// // //         >
// // //           Shop Now
// // //         </a>
// // //       </section>

// // //       {/* Features Section */}
// // //       <section className='py-20 container mx-auto text-center'>
// // //         <h2 className='text-3xl font-bold mb-10 text-gray-800 dark:text-white'>
// // //           Why Choose Us?
// // //         </h2>
// // //         <div className='grid grid-cols-1 md:grid-cols-3 gap-10'>
// // //           <div className='bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md transition duration-300 hover:shadow-xl'>
// // //             <ShoppingCart className='mx-auto mb-4 h-8 w-8 text-primary' />
// // //             <h3 className='text-xl font-semibold text-gray-800 dark:text-gray-100'>
// // //               Wide Selection
// // //             </h3>
// // //             <p className='mt-2 text-gray-600 dark:text-gray-400'>
// // //               Explore a variety of designs and styles to suit your taste.
// // //             </p>
// // //           </div>
// // //           <div className='bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md transition duration-300 hover:shadow-xl'>
// // //             <Phone className='mx-auto mb-4 h-8 w-8 text-primary' />
// // //             <h3 className='text-xl font-semibold text-gray-800 dark:text-gray-100'>
// // //               Top-Notch Quality
// // //             </h3>
// // //             <p className='mt-2 text-gray-600 dark:text-gray-400'>
// // //               Our products are crafted with care, ensuring durability and style.
// // //             </p>
// // //           </div>
// // //           <div className='bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md transition duration-300 hover:shadow-xl'>
// // //             <ShieldCheck className='mx-auto mb-4 h-8 w-8 text-primary' />
// // //             <h3 className='text-xl font-semibold text-gray-800 dark:text-gray-100'>
// // //               Satisfaction Guaranteed
// // //             </h3>
// // //             <p className='mt-2 text-gray-600 dark:text-gray-400'>
// // //               We stand behind our products, providing you peace of mind with
// // //               every purchase.
// // //             </p>
// // //           </div>
// // //         </div>
// // //       </section>

// // //       {/* Testimonials Section */}
// // //       <section className='py-20 bg-gray-100 dark:bg-gray-800'>
// // //         <div className='container mx-auto text-center'>
// // //           <h2 className='text-3xl font-bold mb-10 text-gray-800 dark:text-white'>
// // //             What Our Customers Say
// // //           </h2>
// // //           <div className='flex flex-col md:flex-row justify-center gap-6'>
// // //             <div className='bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md max-w-xs'>
// // //               <p className='italic text-gray-600 dark:text-gray-400'>
// // //                 "Mujhe mera naya phone wrap bahut pasand hai! Yeh perfect fit
// // //                 hai aur bahut acha lagta hai!"
// // //               </p>
// // //               <p className='mt-4 font-semibold text-gray-800 dark:text-white'>
// // //                 - Priya S.
// // //               </p>
// // //             </div>
// // //             <div className='bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md max-w-xs'>
// // //               <p className='italic text-gray-600 dark:text-gray-400'>
// // //                 "Quality bahut achi hai, aur mujhe fast shipping bhi pasand
// // //                 aayi."
// // //               </p>
// // //               <p className='mt-4 font-semibold text-gray-800 dark:text-white'>
// // //                 - Rajesh M.
// // //               </p>
// // //             </div>
// // //             <div className='bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md max-w-xs'>
// // //               <p className='italic text-gray-600 dark:text-gray-400'>
// // //                 "Itne design options hain! Maine apne style ke liye perfect wrap
// // //                 dhunda."
// // //               </p>
// // //               <p className='mt-4 font-semibold text-gray-800 dark:text-white'>
// // //                 - Sneha K.
// // //               </p>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       </section>

// // //       {/* Call to Action Section */}
// // //       <section className='py-20'>
// // //         <div className='container mx-auto text-center'>
// // //           <h2 className='text-3xl font-bold mb-6 text-gray-800 dark:text-white'>
// // //             Ready to Customize Your Device?
// // //           </h2>
// // //           <p className='mb-8 text-gray-600 dark:text-gray-400'>
// // //             Explore our collection and give your devices a fresh new look today!
// // //           </p>
// // //           <a
// // //             href='/products'
// // //             className='bg-primary text-white dark:text-black py-2 px-6 rounded-lg shadow-md hover:bg-primary-dark transition duration-300'
// // //           >
// // //             Shop Now
// // //           </a>
// // //         </div>
// // //       </section>

// // //       {/* Footer Section */}
// // //       <footer className='py-10 bg-gray-200 dark:bg-gray-900 text-center'>
// // //         <p className='text-gray-600 dark:text-gray-400'>
// // //           &copy; {new Date().getFullYear()} {brandName}. All rights reserved.
// // //         </p>
// // //         <div className='mt-4 flex justify-center space-x-4'>
// // //           <a
// // //             href='/about'
// // //             className='text-gray-600 dark:text-gray-400 hover:text-primary transition duration-300'
// // //           >
// // //             About
// // //           </a>
// // //           <a
// // //             href='/products'
// // //             className='text-gray-600 dark:text-gray-400 hover:text-primary transition duration-300'
// // //           >
// // //             Products
// // //           </a>
// // //           <a
// // //             href='/policies'
// // //             className='text-gray-600 dark:text-gray-400 hover:text-primary transition duration-300'
// // //           >
// // //             Policies
// // //           </a>
// // //           <a
// // //             href='/faq'
// // //             className='text-gray-600 dark:text-gray-400 hover:text-primary transition duration-300'
// // //           >
// // //             FAQ
// // //           </a>
// // //           <a
// // //             href='/contact-us'
// // //             className='text-gray-600 dark:text-gray-400 hover:text-primary transition duration-300'
// // //           >
// // //             Contact Us
// // //           </a>
// // //         </div>
// // //       </footer>
// // //     </div>
// // //   );
// // // };

// // // export default IndexPage;

// // // // 'use client';

// // // // import { ThemeSliceState } from '@/types';
// // // // import Image from 'next/image';
// // // // import { useEffect } from 'react';
// // // // import { useSelector } from 'react-redux';
// // // // import { brandName } from './constants';
// // // // import { ShoppingCart, Phone, ShieldCheck } from 'lucide-react'; // Importing relevant icons

// // // // const IndexPage = () => {
// // // //   const { isDark } = useSelector((state: ThemeSliceState) => state.theme);

// // // //   useEffect(() => {
// // // //     if (isDark) {
// // // //       document.documentElement.classList.add('dark');
// // // //     } else {
// // // //       document.documentElement.classList.remove('dark');
// // // //     }
// // // //   }, [isDark]);

// // // //   return (
// // // //     <div className='bg-gray-50 dark:bg-gray-900 transition-all duration-300'>
// // // //       {/* Hero Section */}
// // // //       <section className='flex flex-col justify-center items-center h-screen relative'>
// // // //         <h1 className='tracking-widest uppercase text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-4'>
// // // //           {brandName}
// // // //         </h1>
// // // //         <p className='mb-10 text-center mx-auto max-w-[80%] text-gray-600 dark:text-gray-400'>
// // // //           Welcome to {brandName}! We provide high-quality mobile phone wraps and
// // // //           cases for your devices.
// // // //         </p>
// // // //         <a
// // // //           href='/products'
// // // //           className='bg-primary text-black dark:text-white py-2 px-6 rounded-lg shadow-md hover:bg-primary-dark transition duration-300'
// // // //         >
// // // //           Shop Now
// // // //         </a>
// // // //       </section>

// // // //       {/* Features Section */}
// // // //       <section className='py-20 container mx-auto text-center'>
// // // //         <h2 className='text-3xl font-bold mb-10 text-gray-800 dark:text-white'>
// // // //           Why Choose Us?
// // // //         </h2>
// // // //         <div className='grid grid-cols-1 md:grid-cols-3 gap-10'>
// // // //           <div className='bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md transition duration-300 hover:shadow-xl'>
// // // //             <ShoppingCart className='mx-auto mb-4 h-8 w-8 text-primary' />
// // // //             <h3 className='text-xl font-semibold text-gray-800 dark:text-gray-100'>
// // // //               Wide Selection
// // // //             </h3>
// // // //             <p className='mt-2 text-gray-600 dark:text-gray-400'>
// // // //               Explore a variety of designs and styles to suit your taste.
// // // //             </p>
// // // //           </div>
// // // //           <div className='bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md transition duration-300 hover:shadow-xl'>
// // // //             <Phone className='mx-auto mb-4 h-8 w-8 text-primary' />
// // // //             <h3 className='text-xl font-semibold text-gray-800 dark:text-gray-100'>
// // // //               Top-Notch Quality
// // // //             </h3>
// // // //             <p className='mt-2 text-gray-600 dark:text-gray-400'>
// // // //               Our products are crafted with care, ensuring durability and style.
// // // //             </p>
// // // //           </div>
// // // //           <div className='bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md transition duration-300 hover:shadow-xl'>
// // // //             <ShieldCheck className='mx-auto mb-4 h-8 w-8 text-primary' />
// // // //             <h3 className='text-xl font-semibold text-gray-800 dark:text-gray-100'>
// // // //               Satisfaction Guaranteed
// // // //             </h3>
// // // //             <p className='mt-2 text-gray-600 dark:text-gray-400'>
// // // //               We stand behind our products, providing you peace of mind with
// // // //               every purchase.
// // // //             </p>
// // // //           </div>
// // // //         </div>
// // // //       </section>

// // // //       {/* Testimonials Section */}
// // // //       <section className='py-20 bg-gray-100 dark:bg-gray-800'>
// // // //         <div className='container mx-auto text-center'>
// // // //           <h2 className='text-3xl font-bold mb-10 text-gray-800 dark:text-white'>
// // // //             What Our Customers Say
// // // //           </h2>
// // // //           <div className='flex flex-col md:flex-row justify-center gap-6'>
// // // //             <div className='bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md max-w-xs'>
// // // //               <p className='italic text-gray-600 dark:text-gray-400'>
// // // //                 "Mujhe mera naya phone wrap bahut pasand hai! Yeh perfect fit
// // // //                 hai aur bahut acha lagta hai!"
// // // //               </p>
// // // //               <p className='mt-4 font-semibold text-gray-800 dark:text-white'>
// // // //                 - Priya S.
// // // //               </p>
// // // //             </div>
// // // //             <div className='bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md max-w-xs'>
// // // //               <p className='italic text-gray-600 dark:text-gray-400'>
// // // //                 "Quality bahut achi hai, aur mujhe fast shipping bhi pasand
// // // //                 aayi."
// // // //               </p>
// // // //               <p className='mt-4 font-semibold text-gray-800 dark:text-white'>
// // // //                 - Rajesh M.
// // // //               </p>
// // // //             </div>
// // // //             <div className='bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md max-w-xs'>
// // // //               <p className='italic text-gray-600 dark:text-gray-400'>
// // // //                 "Itne design options hain! Maine apne style ke liye perfect wrap
// // // //                 dhunda."
// // // //               </p>
// // // //               <p className='mt-4 font-semibold text-gray-800 dark:text-white'>
// // // //                 - Sneha K.
// // // //               </p>
// // // //             </div>
// // // //           </div>
// // // //         </div>
// // // //       </section>

// // // //       {/* Call to Action Section */}
// // // //       <section className='py-20'>
// // // //         <div className='container mx-auto text-center'>
// // // //           <h2 className='text-3xl font-bold mb-6 text-gray-800 dark:text-white'>
// // // //             Ready to Customize Your Device?
// // // //           </h2>
// // // //           <p className='mb-8 text-gray-600 dark:text-gray-400'>
// // // //             Explore our collection and give your devices a fresh new look today!
// // // //           </p>
// // // //           <a
// // // //             href='/products'
// // // //             className='bg-primary text-black dark:text-white py-2 px-6 rounded-lg shadow-md hover:bg-primary-dark transition duration-300'
// // // //           >
// // // //             Shop Now
// // // //           </a>
// // // //         </div>
// // // //       </section>

// // // //       {/* Footer Section */}
// // // //       <footer className='py-10 bg-gray-200 dark:bg-gray-900 text-center'>
// // // //         <p className='text-gray-600 dark:text-gray-400'>
// // // //           &copy; {new Date().getFullYear()} {brandName}. All rights reserved.
// // // //         </p>
// // // //         <div className='mt-4 flex justify-center space-x-4'>
// // // //           <a
// // // //             href='/about'
// // // //             className='text-gray-600 dark:text-gray-400 hover:text-primary transition duration-300'
// // // //           >
// // // //             About
// // // //           </a>
// // // //           <a
// // // //             href='/products'
// // // //             className='text-gray-600 dark:text-gray-400 hover:text-primary transition duration-300'
// // // //           >
// // // //             Products
// // // //           </a>
// // // //           <a
// // // //             href='/policies'
// // // //             className='text-gray-600 dark:text-gray-400 hover:text-primary transition duration-300'
// // // //           >
// // // //             Policies
// // // //           </a>
// // // //           <a
// // // //             href='/faq'
// // // //             className='text-gray-600 dark:text-gray-400 hover:text-primary transition duration-300'
// // // //           >
// // // //             FAQ
// // // //           </a>
// // // //           <a
// // // //             href='/contact-us'
// // // //             className='text-gray-600 dark:text-gray-400 hover:text-primary transition duration-300'
// // // //           >
// // // //             Contact Us
// // // //           </a>
// // // //         </div>
// // // //       </footer>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default IndexPage;

// // // // // 'use client';

// // // // // import { ThemeSliceState } from '@/types';
// // // // // import Image from 'next/image';
// // // // // import { useEffect } from 'react';
// // // // // import { useSelector } from 'react-redux';
// // // // // import { brandName } from './constants';
// // // // // import { ShoppingCart, Phone, ShieldCheck } from 'lucide-react'; // Importing relevant icons

// // // // // const IndexPage = () => {
// // // // //   const { isDark } = useSelector((state: ThemeSliceState) => state.theme);

// // // // //   useEffect(() => {
// // // // //     if (isDark) {
// // // // //       document.documentElement.classList.add('dark');
// // // // //     } else {
// // // // //       document.documentElement.classList.remove('dark');
// // // // //     }
// // // // //   }, [isDark]);

// // // // //   return (
// // // // //     <div className='bg-gray-50 dark:bg-gray-900 transition-all duration-300'>
// // // // //       {/* Hero Section */}
// // // // //       <section className='flex flex-col justify-center items-center h-screen relative'>
// // // // //         <h1 className='tracking-widest uppercase text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-4'>
// // // // //           {brandName}
// // // // //         </h1>
// // // // //         <p className='mb-10 text-center mx-auto max-w-[80%] text-gray-600 dark:text-gray-400'>
// // // // //           Welcome to {brandName}! We provide high-quality mobile phone wraps and
// // // // //           cases for your devices.
// // // // //         </p>
// // // // //         <a
// // // // //           href='/products'
// // // // //           className='bg-primary text-white py-2 px-6 rounded-lg shadow-md hover:bg-primary-dark transition duration-300'
// // // // //         >
// // // // //           Shop Now
// // // // //         </a>
// // // // //       </section>

// // // // //       {/* Features Section */}
// // // // //       <section className='py-20 container mx-auto text-center'>
// // // // //         <h2 className='text-3xl font-bold mb-10 text-gray-800 dark:text-white'>
// // // // //           Why Choose Us?
// // // // //         </h2>
// // // // //         <div className='grid grid-cols-1 md:grid-cols-3 gap-10'>
// // // // //           <div className='bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md transition duration-300 hover:shadow-xl'>
// // // // //             <ShoppingCart className='mx-auto mb-4 h-8 w-8 text-primary' />
// // // // //             <h3 className='text-xl font-semibold text-gray-800 dark:text-gray-100'>
// // // // //               Wide Selection
// // // // //             </h3>
// // // // //             <p className='mt-2 text-gray-600 dark:text-gray-400'>
// // // // //               Explore a variety of designs and styles to suit your taste.
// // // // //             </p>
// // // // //           </div>
// // // // //           <div className='bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md transition duration-300 hover:shadow-xl'>
// // // // //             <Phone className='mx-auto mb-4 h-8 w-8 text-primary' />
// // // // //             <h3 className='text-xl font-semibold text-gray-800 dark:text-gray-100'>
// // // // //               Top-Notch Quality
// // // // //             </h3>
// // // // //             <p className='mt-2 text-gray-600 dark:text-gray-400'>
// // // // //               Our products are crafted with care, ensuring durability and style.
// // // // //             </p>
// // // // //           </div>
// // // // //           <div className='bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md transition duration-300 hover:shadow-xl'>
// // // // //             <ShieldCheck className='mx-auto mb-4 h-8 w-8 text-primary' />
// // // // //             <h3 className='text-xl font-semibold text-gray-800 dark:text-gray-100'>
// // // // //               Satisfaction Guaranteed
// // // // //             </h3>
// // // // //             <p className='mt-2 text-gray-600 dark:text-gray-400'>
// // // // //               We stand behind our products, providing you peace of mind with
// // // // //               every purchase.
// // // // //             </p>
// // // // //           </div>
// // // // //         </div>
// // // // //       </section>

// // // // //       {/* Testimonials Section */}
// // // // //       <section className='py-20 bg-gray-100 dark:bg-gray-800'>
// // // // //         <div className='container mx-auto text-center'>
// // // // //           <h2 className='text-3xl font-bold mb-10 text-gray-800 dark:text-white'>
// // // // //             What Our Customers Say
// // // // //           </h2>
// // // // //           <div className='flex flex-col md:flex-row justify-center gap-6'>
// // // // //             <div className='bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md max-w-xs'>
// // // // //               <p className='italic text-gray-600 dark:text-gray-400'>
// // // // //                 "Mujhe mera naya phone wrap bahut pasand hai! Yeh perfect fit
// // // // //                 hai aur bahut acha lagta hai!"
// // // // //               </p>
// // // // //               <p className='mt-4 font-semibold text-gray-800 dark:text-white'>
// // // // //                 - Priya S.
// // // // //               </p>
// // // // //             </div>
// // // // //             <div className='bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md max-w-xs'>
// // // // //               <p className='italic text-gray-600 dark:text-gray-400'>
// // // // //                 "Quality bahut achi hai, aur mujhe fast shipping bhi pasand
// // // // //                 aayi."
// // // // //               </p>
// // // // //               <p className='mt-4 font-semibold text-gray-800 dark:text-white'>
// // // // //                 - Rajesh M.
// // // // //               </p>
// // // // //             </div>
// // // // //             <div className='bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md max-w-xs'>
// // // // //               <p className='italic text-gray-600 dark:text-gray-400'>
// // // // //                 "Itne design options hain! Maine apne style ke liye perfect wrap
// // // // //                 dhunda."
// // // // //               </p>
// // // // //               <p className='mt-4 font-semibold text-gray-800 dark:text-white'>
// // // // //                 - Sneha K.
// // // // //               </p>
// // // // //             </div>
// // // // //           </div>
// // // // //         </div>
// // // // //       </section>

// // // // //       {/* Call to Action Section */}
// // // // //       <section className='py-20'>
// // // // //         <div className='container mx-auto text-center'>
// // // // //           <h2 className='text-3xl font-bold mb-6 text-gray-800 dark:text-white'>
// // // // //             Ready to Customize Your Device?
// // // // //           </h2>
// // // // //           <p className='mb-8 text-gray-600 dark:text-gray-400'>
// // // // //             Explore our collection and give your devices a fresh new look today!
// // // // //           </p>
// // // // //           <a
// // // // //             href='/products'
// // // // //             className='bg-primary text-white py-2 px-6 rounded-lg shadow-md hover:bg-primary-dark transition duration-300'
// // // // //           >
// // // // //             Shop Now
// // // // //           </a>
// // // // //         </div>
// // // // //       </section>

// // // // //       {/* Footer Section */}
// // // // //       <footer className='py-10 bg-gray-200 dark:bg-gray-900 text-center'>
// // // // //         <p className='text-gray-600 dark:text-gray-400'>
// // // // //           &copy; {new Date().getFullYear()} {brandName}. All rights reserved.
// // // // //         </p>
// // // // //         <div className='mt-4 flex justify-center space-x-4'>
// // // // //           <a
// // // // //             href='/about'
// // // // //             className='text-gray-600 dark:text-gray-400 hover:text-primary transition duration-300'
// // // // //           >
// // // // //             About
// // // // //           </a>
// // // // //           <a
// // // // //             href='/products'
// // // // //             className='text-gray-600 dark:text-gray-400 hover:text-primary transition duration-300'
// // // // //           >
// // // // //             Products
// // // // //           </a>
// // // // //           <a
// // // // //             href='/policies'
// // // // //             className='text-gray-600 dark:text-gray-400 hover:text-primary transition duration-300'
// // // // //           >
// // // // //             Policies
// // // // //           </a>
// // // // //           <a
// // // // //             href='/faq'
// // // // //             className='text-gray-600 dark:text-gray-400 hover:text-primary transition duration-300'
// // // // //           >
// // // // //             FAQ
// // // // //           </a>
// // // // //           <a
// // // // //             href='/contact-us'
// // // // //             className='text-gray-600 dark:text-gray-400 hover:text-primary transition duration-300'
// // // // //           >
// // // // //             Contact Us
// // // // //           </a>
// // // // //         </div>
// // // // //       </footer>
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // export default IndexPage;

// // // // // // 'use client';

// // // // // // import { ThemeSliceState } from '@/types';
// // // // // // import Image from 'next/image';
// // // // // // import { useEffect } from 'react';
// // // // // // import { useSelector } from 'react-redux';
// // // // // // import { brandName } from './constants';
// // // // // // import { ShoppingCart, Phone, ShieldCheck, Star } from 'lucide-react'; // Importing relevant icons

// // // // // // const IndexPage = () => {
// // // // // //   const { isDark } = useSelector((state: ThemeSliceState) => state.theme);

// // // // // //   useEffect(() => {
// // // // // //     if (isDark) {
// // // // // //       document.documentElement.classList.add('dark');
// // // // // //     } else {
// // // // // //       document.documentElement.classList.remove('dark');
// // // // // //     }
// // // // // //   }, [isDark]);

// // // // // //   return (
// // // // // //     <div className='bg-gray-50 dark:bg-gray-900 transition-all duration-300'>
// // // // // //       {/* Hero Section */}
// // // // // //       <section className='flex flex-col justify-center items-center h-screen relative'>

// // // // // //         <h1 className='tracking-widest uppercase text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-4'>
// // // // // //           {brandName}
// // // // // //         </h1>
// // // // // //         <p className='mb-10 text-center mx-auto max-w-[80%] text-gray-600 dark:text-gray-400'>
// // // // // //           Welcome to {brandName}! We provide high-quality mobile phone wraps and
// // // // // //           cases for your devices.
// // // // // //         </p>
// // // // // //         <a
// // // // // //           href='/products'
// // // // // //           className='bg-primary text-white py-2 px-6 rounded-lg shadow-md hover:bg-primary-dark transition duration-300'
// // // // // //         >
// // // // // //           Shop Now
// // // // // //         </a>
// // // // // //       </section>

// // // // // //       {/* Features Section */}
// // // // // //       <section className='py-20 container mx-auto text-center'>
// // // // // //         <h2 className='text-3xl font-bold mb-10 text-gray-800 dark:text-white'>
// // // // // //           Why Choose Us?
// // // // // //         </h2>
// // // // // //         <div className='grid grid-cols-1 md:grid-cols-3 gap-10'>
// // // // // //           <div className='bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md transition duration-300 hover:shadow-xl'>
// // // // // //             <ShoppingCart className='mx-auto mb-4 h-8 w-8 text-primary' />
// // // // // //             <h3 className='text-xl font-semibold text-gray-800 dark:text-gray-100'>
// // // // // //               Wide Selection
// // // // // //             </h3>
// // // // // //             <p className='mt-2 text-gray-600 dark:text-gray-400'>
// // // // // //               Explore a variety of designs and styles to suit your taste.
// // // // // //             </p>
// // // // // //           </div>
// // // // // //           <div className='bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md transition duration-300 hover:shadow-xl'>
// // // // // //             <Phone className='mx-auto mb-4 h-8 w-8 text-primary' />
// // // // // //             <h3 className='text-xl font-semibold text-gray-800 dark:text-gray-100'>
// // // // // //               Top-Notch Quality
// // // // // //             </h3>
// // // // // //             <p className='mt-2 text-gray-600 dark:text-gray-400'>
// // // // // //               Our products are crafted with care, ensuring durability and style.
// // // // // //             </p>
// // // // // //           </div>
// // // // // //           <div className='bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md transition duration-300 hover:shadow-xl'>
// // // // // //             <ShieldCheck className='mx-auto mb-4 h-8 w-8 text-primary' />
// // // // // //             <h3 className='text-xl font-semibold text-gray-800 dark:text-gray-100'>
// // // // // //               Satisfaction Guaranteed
// // // // // //             </h3>
// // // // // //             <p className='mt-2 text-gray-600 dark:text-gray-400'>
// // // // // //               We stand behind our products, providing you peace of mind with
// // // // // //               every purchase.
// // // // // //             </p>
// // // // // //           </div>
// // // // // //         </div>
// // // // // //       </section>

// // // // // //       {/* Testimonials Section */}
// // // // // //       <section className='py-20 bg-gray-100 dark:bg-gray-800'>
// // // // // //         <div className='container mx-auto text-center'>
// // // // // //           <h2 className='text-3xl font-bold mb-10 text-gray-800 dark:text-white'>
// // // // // //             What Our Customers Say
// // // // // //           </h2>
// // // // // //           <div className='flex flex-col md:flex-row justify-center gap-6'>
// // // // // //             <div className='bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md max-w-xs'>
// // // // // //               <p className='italic text-gray-600 dark:text-gray-400'>
// // // // // //                 "I love my new phone wrap! It fits perfectly and looks amazing!"
// // // // // //               </p>
// // // // // //               <p className='mt-4 font-semibold text-gray-800 dark:text-white'>
// // // // // //                 - Alex R.
// // // // // //               </p>
// // // // // //             </div>
// // // // // //             <div className='bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md max-w-xs'>
// // // // // //               <p className='italic text-gray-600 dark:text-gray-400'>
// // // // // //                 "The quality is top-notch, and I appreciate the fast shipping."
// // // // // //               </p>
// // // // // //               <p className='mt-4 font-semibold text-gray-800 dark:text-white'>
// // // // // //                 - Sarah L.
// // // // // //               </p>
// // // // // //             </div>
// // // // // //             <div className='bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md max-w-xs'>
// // // // // //               <p className='italic text-gray-600 dark:text-gray-400'>
// // // // // //                 "So many design options! I found the perfect one for my style."
// // // // // //               </p>
// // // // // //               <p className='mt-4 font-semibold text-gray-800 dark:text-white'>
// // // // // //                 - John D.
// // // // // //               </p>
// // // // // //             </div>
// // // // // //           </div>
// // // // // //         </div>
// // // // // //       </section>

// // // // // //       {/* Call to Action Section */}
// // // // // //       <section className='py-20'>
// // // // // //         <div className='container mx-auto text-center'>
// // // // // //           <h2 className='text-3xl font-bold mb-6 text-gray-800 dark:text-white'>
// // // // // //             Ready to Customize Your Device?
// // // // // //           </h2>
// // // // // //           <p className='mb-8 text-gray-600 dark:text-gray-400'>
// // // // // //             Explore our collection and give your devices a fresh new look today!
// // // // // //           </p>
// // // // // //           <a
// // // // // //             href='/products'
// // // // // //             className='bg-primary text-white py-2 px-6 rounded-lg shadow-md hover:bg-primary-dark transition duration-300'
// // // // // //           >
// // // // // //             Shop Now
// // // // // //           </a>
// // // // // //         </div>
// // // // // //       </section>

// // // // // //       {/* Footer Section */}
// // // // // //       <footer className='py-10 bg-gray-200 dark:bg-gray-900 text-center'>
// // // // // //         <p className='text-gray-600 dark:text-gray-400'>
// // // // // //           &copy; {new Date().getFullYear()} {brandName}. All rights reserved.
// // // // // //         </p>
// // // // // //         <div className='mt-4 flex justify-center space-x-4'>
// // // // // //           <a
// // // // // //             href='/about'
// // // // // //             className='text-gray-600 dark:text-gray-400 hover:text-primary transition duration-300'
// // // // // //           >
// // // // // //             About
// // // // // //           </a>
// // // // // //           <a
// // // // // //             href='/products'
// // // // // //             className='text-gray-600 dark:text-gray-400 hover:text-primary transition duration-300'
// // // // // //           >
// // // // // //             Products
// // // // // //           </a>
// // // // // //           <a
// // // // // //             href='/policies'
// // // // // //             className='text-gray-600 dark:text-gray-400 hover:text-primary transition duration-300'
// // // // // //           >
// // // // // //             Policies
// // // // // //           </a>
// // // // // //           <a
// // // // // //             href='/faq'
// // // // // //             className='text-gray-600 dark:text-gray-400 hover:text-primary transition duration-300'
// // // // // //           >
// // // // // //             FAQ
// // // // // //           </a>
// // // // // //           <a
// // // // // //             href='/contact-us'
// // // // // //             className='text-gray-600 dark:text-gray-400 hover:text-primary transition duration-300'
// // // // // //           >
// // // // // //             Contact Us
// // // // // //           </a>
// // // // // //         </div>
// // // // // //       </footer>
// // // // // //     </div>
// // // // // //   );
// // // // // // };

// // // // // // export default IndexPage;

// // // // // // 'use client';

// // // // // // import { ThemeSliceState } from '@/types';
// // // // // // import Image from 'next/image';
// // // // // // import { useEffect } from 'react';
// // // // // // import { useSelector } from 'react-redux';
// // // // // // import { brandName } from './constants';
// // // // // // import Link from 'next/link'; // Import Link from Next.js

// // // // // // const IndexPage = () => {
// // // // // //   const { isDark } = useSelector((state: ThemeSliceState) => state.theme);

// // // // // //   useEffect(() => {
// // // // // //     if (isDark) {
// // // // // //       document.documentElement.classList.add('dark');
// // // // // //     } else {
// // // // // //       document.documentElement.classList.remove('dark');
// // // // // //     }
// // // // // //   }, [isDark]);

// // // // // //   return (
// // // // // //     <div className='bg-gray-50 dark:bg-gray-900 transition-all duration-300'>
// // // // // //       {/* Navigation Menu */}
// // // // // //       <nav className='bg-white dark:bg-gray-800 p-4 shadow-md'>
// // // // // //         <div className='container mx-auto flex justify-between items-center'>
// // // // // //           <h1 className='text-xl font-bold text-gray-800 dark:text-white'>
// // // // // //             {brandName}
// // // // // //           </h1>
// // // // // //           <ul className='flex space-x-6'>
// // // // // //             <li>
// // // // // //               <Link
// // // // // //                 href='/about'
// // // // // //                 className='text-gray-800 dark:text-gray-200 hover:text-primary transition duration-300'
// // // // // //               >
// // // // // //                 About
// // // // // //               </Link>
// // // // // //             </li>
// // // // // //             <li>
// // // // // //               <Link
// // // // // //                 href='/products'
// // // // // //                 className='text-gray-800 dark:text-gray-200 hover:text-primary transition duration-300'
// // // // // //               >
// // // // // //                 Products
// // // // // //               </Link>
// // // // // //             </li>
// // // // // //             <li>
// // // // // //               <Link
// // // // // //                 href='/policies'
// // // // // //                 className='text-gray-800 dark:text-gray-200 hover:text-primary transition duration-300'
// // // // // //               >
// // // // // //                 Policies
// // // // // //               </Link>
// // // // // //             </li>
// // // // // //             <li>
// // // // // //               <Link
// // // // // //                 href='/faq'
// // // // // //                 className='text-gray-800 dark:text-gray-200 hover:text-primary transition duration-300'
// // // // // //               >
// // // // // //                 FAQ
// // // // // //               </Link>
// // // // // //             </li>
// // // // // //             <li>
// // // // // //               <Link
// // // // // //                 href='/contact-us'
// // // // // //                 className='text-gray-800 dark:text-gray-200 hover:text-primary transition duration-300'
// // // // // //               >
// // // // // //                 Contact Us
// // // // // //               </Link>
// // // // // //             </li>
// // // // // //           </ul>
// // // // // //         </div>
// // // // // //       </nav>

// // // // // //       {/* Hero Section */}
// // // // // //       <section className='h-nav-full flex flex-col justify-center items-center'>
// // // // // //         <Image
// // // // // //           priority
// // // // // //           src='/iphone_top.webp'
// // // // // //           alt='iphone_top'
// // // // // //           width={800}
// // // // // //           height={490}
// // // // // //           className='fixed bottom-0 max-w-[75%] md:max-w-[50%] h-auto'
// // // // // //           style={{
// // // // // //             transform: 'translateX(-50%)',
// // // // // //             left: '50%',
// // // // // //           }}
// // // // // //         />
// // // // // //         <h1 className='tracking-widest uppercase text-4xl md:text-5xl font-bold text-gray-800 dark:text-white'>
// // // // // //           {brandName}
// // // // // //         </h1>
// // // // // //         <p className='mb-40 text-center mx-auto max-w-[80%] text-gray-600 dark:text-gray-400'>
// // // // // //           Welcome to {brandName}! We are a mobile phone accessory store that
// // // // // //           provides high-quality phone wraps and cases for your mobile devices.
// // // // // //         </p>
// // // // // //       </section>

// // // // // //       {/* Features Section */}
// // // // // //       <section className='py-20'>
// // // // // //         <div className='container mx-auto text-center'>
// // // // // //           <h2 className='text-3xl font-bold mb-6 text-gray-800 dark:text-white'>
// // // // // //             Why Choose Us?
// // // // // //           </h2>
// // // // // //           <div className='grid grid-cols-1 md:grid-cols-3 gap-10'>
// // // // // //             <div className='bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md'>
// // // // // //               <h3 className='text-xl font-semibold text-gray-800 dark:text-gray-100'>
// // // // // //                 Premium Quality
// // // // // //               </h3>
// // // // // //               <p className='mt-2 text-gray-600 dark:text-gray-400'>
// // // // // //                 Our products are made from the finest materials, ensuring
// // // // // //                 durability and a perfect fit for your devices.
// // // // // //               </p>
// // // // // //             </div>
// // // // // //             <div className='bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md'>
// // // // // //               <h3 className='text-xl font-semibold text-gray-800 dark:text-gray-100'>
// // // // // //                 Custom Designs
// // // // // //               </h3>
// // // // // //               <p className='mt-2 text-gray-600 dark:text-gray-400'>
// // // // // //                 Choose from a wide range of unique designs to express your
// // // // // //                 personality and style.
// // // // // //               </p>
// // // // // //             </div>
// // // // // //             <div className='bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md'>
// // // // // //               <h3 className='text-xl font-semibold text-gray-800 dark:text-gray-100'>
// // // // // //                 Satisfaction Guaranteed
// // // // // //               </h3>
// // // // // //               <p className='mt-2 text-gray-600 dark:text-gray-400'>
// // // // // //                 We are committed to providing excellent customer service and
// // // // // //                 quality assurance for all our products.
// // // // // //               </p>
// // // // // //             </div>
// // // // // //           </div>
// // // // // //         </div>
// // // // // //       </section>

// // // // // //       {/* Testimonials Section */}
// // // // // //       <section className='py-20 bg-gray-100 dark:bg-gray-800'>
// // // // // //         <div className='container mx-auto text-center'>
// // // // // //           <h2 className='text-3xl font-bold mb-6 text-gray-800 dark:text-white'>
// // // // // //             What Our Customers Say
// // // // // //           </h2>
// // // // // //           <div className='flex flex-col md:flex-row justify-center gap-6'>
// // // // // //             <div className='bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md max-w-xs'>
// // // // // //               <p className='italic text-gray-600 dark:text-gray-400'>
// // // // // //                 "I love my new phone wrap! It fits perfectly and looks amazing!"
// // // // // //               </p>
// // // // // //               <p className='mt-4 font-semibold text-gray-800 dark:text-white'>
// // // // // //                 - Alex R.
// // // // // //               </p>
// // // // // //             </div>
// // // // // //             <div className='bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md max-w-xs'>
// // // // // //               <p className='italic text-gray-600 dark:text-gray-400'>
// // // // // //                 "The quality is top-notch, and I appreciate the fast shipping."
// // // // // //               </p>
// // // // // //               <p className='mt-4 font-semibold text-gray-800 dark:text-white'>
// // // // // //                 - Sarah L.
// // // // // //               </p>
// // // // // //             </div>
// // // // // //             <div className='bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md max-w-xs'>
// // // // // //               <p className='italic text-gray-600 dark:text-gray-400'>
// // // // // //                 "So many design options! I found the perfect one for my style."
// // // // // //               </p>
// // // // // //               <p className='mt-4 font-semibold text-gray-800 dark:text-white'>
// // // // // //                 - John D.
// // // // // //               </p>
// // // // // //             </div>
// // // // // //           </div>
// // // // // //         </div>
// // // // // //       </section>

// // // // // //       {/* Call to Action Section */}
// // // // // //       <section className='py-20'>
// // // // // //         <div className='container mx-auto text-center'>
// // // // // //           <h2 className='text-3xl font-bold mb-6 text-gray-800 dark:text-white'>
// // // // // //             Ready to Customize Your Device?
// // // // // //           </h2>
// // // // // //           <p className='mb-8 text-gray-600 dark:text-gray-400'>
// // // // // //             Explore our collection and give your devices a fresh new look today!
// // // // // //           </p>
// // // // // //           <Link
// // // // // //             href='/products'
// // // // // //             className='bg-primary text-white py-2 px-6 rounded-lg shadow-md hover:bg-primary-dark transition duration-300'
// // // // // //           >
// // // // // //             Shop Now
// // // // // //           </Link>
// // // // // //         </div>
// // // // // //       </section>

// // // // // //       {/* Footer Section */}
// // // // // //       <footer className='py-10 bg-gray-200 dark:bg-gray-900 text-center'>
// // // // // //         <p className='text-gray-600 dark:text-gray-400'>
// // // // // //           &copy; {new Date().getFullYear()} {brandName}. All rights reserved.
// // // // // //         </p>
// // // // // //         <div className='mt-4 flex justify-center space-x-4'>
// // // // // //           <Link
// // // // // //             href='/about'
// // // // // //             className='text-gray-600 dark:text-gray-400 hover:text-primary transition duration-300'
// // // // // //           >
// // // // // //             About
// // // // // //           </Link>
// // // // // //           <Link
// // // // // //             href='/products'
// // // // // //             className='text-gray-600 dark:text-gray-400 hover:text-primary transition duration-300'
// // // // // //           >
// // // // // //             Products
// // // // // //           </Link>
// // // // // //           <Link
// // // // // //             href='/policies'
// // // // // //             className='text-gray-600 dark:text-gray-400 hover:text-primary transition duration-300'
// // // // // //           >
// // // // // //             Policies
// // // // // //           </Link>
// // // // // //           <Link
// // // // // //             href='/faq'
// // // // // //             className='text-gray-600 dark:text-gray-400 hover:text-primary transition duration-300'
// // // // // //           >
// // // // // //             FAQ
// // // // // //           </Link>
// // // // // //           <Link
// // // // // //             href='/contact-us'
// // // // // //             className='text-gray-600 dark:text-gray-400 hover:text-primary transition duration-300'
// // // // // //           >
// // // // // //             Contact Us
// // // // // //           </Link>
// // // // // //         </div>
// // // // // //       </footer>
// // // // // //     </div>
// // // // // //   );
// // // // // // };

// // // // // // export default IndexPage;

// // // // // // // 'use client';

// // // // // // // import { ThemeSliceState } from '@/types';
// // // // // // // import Image from 'next/image';
// // // // // // // import { useEffect } from 'react';
// // // // // // // import { useSelector } from 'react-redux';
// // // // // // // import { brandName } from './constants';

// // // // // // // const IndexPage = () => {
// // // // // // //   const { isDark } = useSelector((state: ThemeSliceState) => state.theme);

// // // // // // //   useEffect(() => {
// // // // // // //     if (isDark) {
// // // // // // //       document.documentElement.classList.add('dark');
// // // // // // //     } else {
// // // // // // //       document.documentElement.classList.remove('dark');
// // // // // // //     }
// // // // // // //   }, [isDark]);

// // // // // // //   return (
// // // // // // //     <div className='bg-gray-50 dark:bg-gray-900 transition-all duration-300'>
// // // // // // //       {/* Hero Section */}
// // // // // // //       <section className='h-nav-full flex flex-col justify-center items-center'>
// // // // // // //         <Image
// // // // // // //           priority
// // // // // // //           src='/iphone_top.webp'
// // // // // // //           alt='iphone_top'
// // // // // // //           width={800}
// // // // // // //           height={490}
// // // // // // //           className='fixed bottom-0 max-w-[75%] md:max-w-[50%] h-auto'
// // // // // // //           style={{
// // // // // // //             transform: 'translateX(-50%)',
// // // // // // //             left: '50%',
// // // // // // //           }}
// // // // // // //         />
// // // // // // //         <h1 className='tracking-widest uppercase text-4xl md:text-5xl font-bold text-gray-800 dark:text-white'>
// // // // // // //           {brandName}
// // // // // // //         </h1>
// // // // // // //         <p className='mb-40 text-center mx-auto max-w-[80%] text-gray-600 dark:text-gray-400'>
// // // // // // //           Welcome to {brandName}! We are a mobile phone accessory store that
// // // // // // //           provides high-quality phone wraps and cases for your mobile devices.
// // // // // // //         </p>
// // // // // // //       </section>

// // // // // // //       {/* Features Section */}
// // // // // // //       <section className='py-20'>
// // // // // // //         <div className='container mx-auto text-center'>
// // // // // // //           <h2 className='text-3xl font-bold mb-6 text-gray-800 dark:text-white'>
// // // // // // //             Why Choose Us?
// // // // // // //           </h2>
// // // // // // //           <div className='grid grid-cols-1 md:grid-cols-3 gap-10'>
// // // // // // //             <div className='bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md'>
// // // // // // //               <h3 className='text-xl font-semibold text-gray-800 dark:text-gray-100'>
// // // // // // //                 Premium Quality
// // // // // // //               </h3>
// // // // // // //               <p className='mt-2 text-gray-600 dark:text-gray-400'>
// // // // // // //                 Our products are made from the finest materials, ensuring
// // // // // // //                 durability and a perfect fit for your devices.
// // // // // // //               </p>
// // // // // // //             </div>
// // // // // // //             <div className='bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md'>
// // // // // // //               <h3 className='text-xl font-semibold text-gray-800 dark:text-gray-100'>
// // // // // // //                 Custom Designs
// // // // // // //               </h3>
// // // // // // //               <p className='mt-2 text-gray-600 dark:text-gray-400'>
// // // // // // //                 Choose from a wide range of unique designs to express your
// // // // // // //                 personality and style.
// // // // // // //               </p>
// // // // // // //             </div>
// // // // // // //             <div className='bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md'>
// // // // // // //               <h3 className='text-xl font-semibold text-gray-800 dark:text-gray-100'>
// // // // // // //                 Satisfaction Guaranteed
// // // // // // //               </h3>
// // // // // // //               <p className='mt-2 text-gray-600 dark:text-gray-400'>
// // // // // // //                 We are committed to providing excellent customer service and
// // // // // // //                 quality assurance for all our products.
// // // // // // //               </p>
// // // // // // //             </div>
// // // // // // //           </div>
// // // // // // //         </div>
// // // // // // //       </section>

// // // // // // //       {/* Testimonials Section */}
// // // // // // //       <section className='py-20 bg-gray-100 dark:bg-gray-800'>
// // // // // // //         <div className='container mx-auto text-center'>
// // // // // // //           <h2 className='text-3xl font-bold mb-6 text-gray-800 dark:text-white'>
// // // // // // //             What Our Customers Say
// // // // // // //           </h2>
// // // // // // //           <div className='flex flex-col md:flex-row justify-center gap-6'>
// // // // // // //             <div className='bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md max-w-xs'>
// // // // // // //               <p className='italic text-gray-600 dark:text-gray-400'>
// // // // // // //                 "I love my new phone wrap! It fits perfectly and looks amazing!"
// // // // // // //               </p>
// // // // // // //               <p className='mt-4 font-semibold text-gray-800 dark:text-white'>
// // // // // // //                 - Alex R.
// // // // // // //               </p>
// // // // // // //             </div>
// // // // // // //             <div className='bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md max-w-xs'>
// // // // // // //               <p className='italic text-gray-600 dark:text-gray-400'>
// // // // // // //                 "The quality is top-notch, and I appreciate the fast shipping."
// // // // // // //               </p>
// // // // // // //               <p className='mt-4 font-semibold text-gray-800 dark:text-white'>
// // // // // // //                 - Sarah L.
// // // // // // //               </p>
// // // // // // //             </div>
// // // // // // //             <div className='bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md max-w-xs'>
// // // // // // //               <p className='italic text-gray-600 dark:text-gray-400'>
// // // // // // //                 "So many design options! I found the perfect one for my style."
// // // // // // //               </p>
// // // // // // //               <p className='mt-4 font-semibold text-gray-800 dark:text-white'>
// // // // // // //                 - John D.
// // // // // // //               </p>
// // // // // // //             </div>
// // // // // // //           </div>
// // // // // // //         </div>
// // // // // // //       </section>

// // // // // // //       {/* Call to Action Section */}
// // // // // // //       <section className='py-20'>
// // // // // // //         <div className='container mx-auto text-center'>
// // // // // // //           <h2 className='text-3xl font-bold mb-6 text-gray-800 dark:text-white'>
// // // // // // //             Ready to Customize Your Device?
// // // // // // //           </h2>
// // // // // // //           <p className='mb-8 text-gray-600 dark:text-gray-400'>
// // // // // // //             Explore our collection and give your devices a fresh new look today!
// // // // // // //           </p>
// // // // // // //           <button className='bg-primary text-white py-2 px-6 rounded-lg shadow-md hover:bg-primary-dark transition duration-300'>
// // // // // // //             Shop Now
// // // // // // //           </button>
// // // // // // //         </div>
// // // // // // //       </section>

// // // // // // //       {/* Footer Section */}
// // // // // // //       <footer className='py-10 bg-gray-200 dark:bg-gray-900 text-center'>
// // // // // // //         <p className='text-gray-600 dark:text-gray-400'>
// // // // // // //           &copy; {new Date().getFullYear()} {brandName}. All rights reserved.
// // // // // // //         </p>
// // // // // // //       </footer>
// // // // // // //     </div>
// // // // // // //   );
// // // // // // // };

// // // // // // // export default IndexPage;

// // // // // // // // "use client";

// // // // // // // // import { ThemeSliceState } from "@/types";
// // // // // // // // import Image from "next/image";
// // // // // // // // import { useEffect } from "react";
// // // // // // // // import { useSelector } from "react-redux";
// // // // // // // // import { brandName } from "./constants";

// // // // // // // // const IndexPage = () => {
// // // // // // // //   const { isDark } = useSelector((state: ThemeSliceState) => state.theme);

// // // // // // // //   useEffect(() => {
// // // // // // // //     if (isDark) {
// // // // // // // //       document.documentElement.classList.add("dark");
// // // // // // // //     } else {
// // // // // // // //       document.documentElement.classList.remove("dark");
// // // // // // // //     }
// // // // // // // //   }, [isDark]);

// // // // // // // //   return (
// // // // // // // //     <section className="h-nav-full flex flex-col justify-center items-center">
// // // // // // // //       <Image
// // // // // // // //         priority
// // // // // // // //         src="/iphone_top.webp"
// // // // // // // //         alt="iphone_top"
// // // // // // // //         width={800}
// // // // // // // //         height={490}
// // // // // // // //         className="fixed bottom-0 max-w-[75%] md:max-w-[50%] h-auto"
// // // // // // // //         style={{
// // // // // // // //           transform: "translateX(-50%)",
// // // // // // // //           left: "50%",
// // // // // // // //         }}
// // // // // // // //       />
// // // // // // // //       <h1 className="tracking-widest uppercase">{brandName}</h1>
// // // // // // // //       <p className="mb-40 text-center mx-auto max-w-[80%]">
// // // // // // // //         Welcome to {brandName}! We are a mobile phone accessory store that
// // // // // // // //         provides high-quality phone wraps and cases for your mobile devices.
// // // // // // // //       </p>
// // // // // // // //     </section>
// // // // // // // //   );
// // // // // // // // };

// // // // // // // // export default IndexPage;
