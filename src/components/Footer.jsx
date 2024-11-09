import React from "react";
import { brandName, links } from "@/lib/constants";

const Footer = () => {
  const currentYear = new Date().getFullYear(); // Extracted for readability

  return (
    <footer className="border-t py-10 text-center">
      <p>
        &copy; {currentYear} {brandName}. All rights reserved.
      </p>
      <nav
        aria-label="Footer links"
        className="mt-4 flex md:flex-row flex-col gap-5 justify-center"
      >
        {links.map((link, index) => (
          <a
            key={index}
            href={link.url}
            className={link.className}
            aria-label={link.name}
          >
            {link.name}
          </a>
        ))}
      </nav>
    </footer>
  );
};

export default Footer;
