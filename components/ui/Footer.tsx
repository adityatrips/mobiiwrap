import React from "react";
import { brandName, links } from "@/app/constants";
const Footer = () => {
  return (
    <footer className="border-t py-10 text-center">
      <p>
        &copy; {new Date().getFullYear()} {brandName}. All rights reserved.
      </p>
      <div className="mt-4 flex md:flex-row flex-col  gap-5 justify-center">
        {links.map((link, index) => (
          <a key={index} href={link.url} className={link.className}>
            {link.name}
          </a>
        ))}
      </div>
    </footer>
  );
};

export default Footer;
