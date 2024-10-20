"use client";

import { ThemeSliceState } from "@/types";
import Image from "next/image";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const IndexPage = () => {
  const { isDark } = useSelector((state: ThemeSliceState) => state.theme);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  return (
    <section className="h-nav-full flex flex-col justify-center items-center">
      <Image
        priority
        src="/iphone_top.webp"
        alt="iphone_top"
        width={800}
        height={490}
        className="fixed bottom-0 max-w-[75%] md:max-w-[50%] h-auto"
        style={{
          transform: "translateX(-50%)",
          left: "50%",
        }}
      />
      <h1>Mobii Wrap</h1>
      <p className="mb-40 text-center mx-auto max-w-[80%]">
        Welcome to Mobii Wrap! We are a mobile phone accessory store that
        provides high-quality phone wraps and cases for your mobile devices.
      </p>
    </section>
  );
};

export default IndexPage;
