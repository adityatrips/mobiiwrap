"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React from "react";

const NotFound = () => {
  const router = useRouter();

  return (
    <div className="w-1/2 mx-auto h-nav-full flex flex-col gap-4 justify-center items-center">
      <h1 className="text-center">404 - Page Not Found</h1>
      <p className="text-center">
        The page you are looking for might have been removed, had its name
        changed, or is temporarily unavailable.
      </p>
      <Button className="w-full" onClick={() => router.back()}>
        Go back
      </Button>
    </div>
  );
};

export default NotFound;
