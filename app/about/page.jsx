import React from "react";
// import { brandName } from '@/constants';
import { brandName } from "../constants";
import { Phone, Headphones, Star } from "lucide-react"; // Example icon imports from Lucide

const AboutPage = () => {
  return (
    <div className="container mx-auto px-2 mt-20 flex flex-col gap-8 justify-center min-h-nav-full py-10 transition-all duration-300">
      <div className="text-center">
        <p className="text-xs uppercase tracking-widest font-semibold">
          Why Choose Us?
        </p>
        <h2 className="text-4xl font-bold mt-2">
          Make Your Customers Happy with Exceptional Service
        </h2>
      </div>
      <div className="text-center">
        <p className="text-lg">
          Founded in 2019 in Karol Bagh&quot;s bustling Gaffar Market,{" "}
          <strong>{brandName}</strong> has quickly become the top destination
          for superior quality wrapping services, offering high-end device skins
          for phones, earphones, and more.
        </p>
      </div>
      <div className="flex flex-col md:flex-row items-center gap-6 mt-6">
        <div className="flex-1 text-base leading-relaxed ">
          <p>
            I&quot;m <strong>Shubham Khandelwal</strong>, and this is{" "}
            <strong>{brandName}</strong>. We&quot;re passionate about
            “wrapping.” Our goal is to lead globally in custom wrapping
            solutions, transforming everyday items into unique, tailored
            masterpieces.
          </p>
          <p className="mt-4">
            Our mission is to bring creativity and personalization to your
            devices. We believe every item deserves a unique touch that reflects
            your personality and style.
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
        <div
          className="flex flex-col items-center 
        border rounded-lg shadow-md p-6"
        >
          <Phone className="text-4xl mb-4" />
          <h3 className="text-lg font-semibold">Mobile Phone Skins</h3>
          <p className="text-center">
            Transform your phone with our stunning skins that offer both style
            and protection, without the bulk of traditional cases.
          </p>
        </div>

        <div
          className="flex flex-col items-center 
        border rounded-lg shadow-md p-6"
        >
          <Headphones className="text-4xl mb-4" />
          <h3 className="text-lg font-semibold">Earphone Skins</h3>
          <p className="text-center">
            Elevate your earphones with our unique designs that make a statement
            while safeguarding your devices.
          </p>
        </div>

        <div
          className="flex flex-col items-center 
        border rounded-lg shadow-md p-6"
        >
          <Star className="text-4xl mb-4" />
          <h3 className="text-lg font-semibold">Quality Assurance</h3>
          <p className="text-center">
            Each product undergoes rigorous quality checks to ensure you receive
            nothing but the best.
          </p>
        </div>
      </div>
      {/* Conclusion Section */}
      <div className="text-center mt-10">
        <h3 className="text-2xl font-bold mb-4">Join Our Journey!</h3>
        <p className="">
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
