import Image from "next/image";
import React from "react";

const AuthenticationLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="flex flex-col md:flex-row justify-center items-center gap-4">
      {children}
      <Image
        alt="Login page image"
        src="https://images.unsplash.com/photo-1728388939226-3fc095526a91?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        width={2070}
        height={1380}
        className="h-nav-full w-full object-cover object-left-center  max-w-full md:max-w-[50%] rounded-lg"
      />
    </section>
  );
};

export default AuthenticationLayout;
