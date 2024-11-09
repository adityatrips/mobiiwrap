"use client";

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useToast } from "../hooks/use-toast";

const withAuth = (WrappedComponent) => {
  const AuthenticatedComponent = (props) => {
    const navigate = useNavigate();
    const { isLoggedIn } = useSelector((state) => state.auth);
    const { toast } = useToast();

    useEffect(() => {
      if (!isLoggedIn) {
        toast({
          title: "Unauthorized",
          description: "You need to be logged in to access this page",
          variant: "destructive",
        });
        navigate("/log-in");
      }
    }, [isLoggedIn]);

    if (!isLoggedIn) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };

  return AuthenticatedComponent;
};

export default withAuth;
