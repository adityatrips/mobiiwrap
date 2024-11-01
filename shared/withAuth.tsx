"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { AuthSliceState } from "@/types";
import { useToast } from "@/hooks/use-toast";

const withAuth = (WrappedComponent: React.ComponentType) => {
  const AuthenticatedComponent = (props: any) => {
    const router = useRouter();
    const { isLoggedIn } = useSelector((state: AuthSliceState) => state.auth);
    const { toast } = useToast();

    useEffect(() => {
      if (!isLoggedIn) {
        toast({
          title: "Unauthorized",
          description: "You need to be logged in to access this page",
          variant: "destructive",
        });
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
