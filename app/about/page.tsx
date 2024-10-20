import React from "react";
import { brandName } from "../constants";

const AboutPage = () => {
  return (
    <div className="flex flex-col gap-2 justify-center min-h-nav-full mx-auto container">
      <p className="text-sm text-primary uppercase tracking-widest">
        Why Choose Us?
      </p>
      <h2>Make your customers happy by giving services.</h2>
      <p>
        Founded in 2019 and nestled in the bustling Gaffar Market of Karol Bagh,
        {brandName} is your go-to destination for top-quality wrapping services,
        including mobile phones, earphones, and other device skins. Renowned for
        our superior quality, excellent service, and impeccable finishing, we
        consistently strive to exceed your expectations.
      </p>
      <p>
        I&apos;m Shubham Khandelwal, this is {brandName}, and we love
        “wrapping”. Our vision is to become a global leader in wrapping
        solutions. We are dedicated to offering customized wrapping options for
        everything, transforming everyday items into unique, personalized pieces
        tailored to your preferences.
      </p>
      <p>
        Our range of skins includes mobile phone skins, earphone skins, and a
        lot more. Each product is crafted to provide a fresh, customized look
        while offering protection and style.
      </p>
      <p>
        Join us on our journey to give everything a fresh, customized look. At
        {brandName}, we believe that with the right wrap, anything is possible.
        Explore our skins collection today and discover how we can transform
        your devices into unique, personalized masterpieces.
      </p>
    </div>
  );
};

export default AboutPage;
