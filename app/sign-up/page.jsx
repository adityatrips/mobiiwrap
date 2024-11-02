"use client";

import Image from "next/image";
import React from "react";
import { useState } from "react";

import { useLoginMut, useSignupMut } from "@/services/mutations";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { updateUser } from "@/stores/authSlice";
import { useDispatch } from "react-redux";
import { useToast } from "@/hooks/use-toast";
import { useLoginModal } from "@/context/LoginModalContext";

const AuthenticationLayout = ({ children }) => {
  const { toast } = useToast();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();

  const signUp = useSignupMut();
  const logIn = useLoginMut();

  const { setIsLoginOpen } = useLoginModal();
  const [isSigningUp, setIsSigningUp] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    setIsSigningUp(true);
    signUp.mutate(
      { name: `${firstName} ${lastName}`, email, password },
      {
        onSettled: () => {
          setIsSigningUp(false);
        },
        onError: () => {
          toast({
            title: "An error occurred",
            description: "Please try again",
            variant: "destructive",
          });
        },
        onSuccess: () => {
          toast({
            title: "Account created successfully",
            description: "You can now login",
          });
          logIn.mutate(
            {
              email,
              password,
            },
            {
              onError: () => {
                toast({
                  title: "An error occurred",
                  description: "Please try again",
                  variant: "destructive",
                });
              },
              onSuccess(data) {
                toast({
                  title: "Welcome back!",
                  description: "You are now logged in",
                });
                router.push("/");
                dispatch(updateUser(data.data));
              },
            }
          );
        },
      }
    );
  };

  return (
    <section className="container mx-auto px-2 mt-20 flex flex-col md:flex-row justify-center items-center gap-4">
      <form
        className="flex flex-col items-center justify-center w-full gap-4"
        onSubmit={handleSubmit}
      >
        <h2 className="text-center">Welcome to the shop! 🛒</h2>
        <p className="text-center">
          Signup with an account to unlock a special shopping experience
        </p>
        <div className="flex w-full gap-4">
          <Input
            aria-label="First name"
            placeholder="First name"
            required
            color="default"
            defaultValue={firstName}
            type="text"
            onChange={(e) => setFirstName(e.target.value)}
          />
          <Input
            aria-label="Last name"
            placeholder="Last name"
            required
            color="default"
            defaultValue={lastName}
            type="text"
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <Input
          aria-label="Email"
          placeholder="Email address"
          required
          color="default"
          defaultValue={email}
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          aria-label="Password"
          placeholder="Password"
          required
          color="default"
          defaultValue={password}
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="flex items-center justify-between gap-4 w-full">
          <Button
            disabled={isSigningUp}
            className="w-2/5"
            color="primary"
            type="submit"
          >
            {isSigningUp ? "Signing up..." : "Sign up"}
          </Button>
          <p
            className="flex flex-col cursor-pointer text-blue-500"
            onClick={() => {
              setIsLoginOpen(true);
            }}
          >
            Already have an account? Login
          </p>
        </div>
      </form>
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
