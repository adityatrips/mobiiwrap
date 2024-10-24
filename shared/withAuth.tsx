"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { AuthSliceState } from "@/types";

const withAuth = (WrappedComponent: React.ComponentType) => {
  const AuthenticatedComponent = (props: any) => {
    const router = useRouter();
    const { isLoggedIn } = useSelector((state: AuthSliceState) => state.auth);

    useEffect(() => {
      if (!isLoggedIn) {
        toast.error("You need to log in to access this page");
        router.push("/log-in");
      }
    }, [isLoggedIn, router]);

    if (!isLoggedIn) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };

  return AuthenticatedComponent;
};

export default withAuth;
