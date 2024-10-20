"use client";

import { useState } from "react";

import { useLoginMut, useSignupMut } from "@/services/mutations";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { updateUser } from "@/stores/authSlice";
import { useDispatch } from "react-redux";

const SignupPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();

  const signUp = useSignupMut();
  const logIn = useLoginMut();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    signUp.mutate(
      { name: `${firstName} ${lastName}`, email, password },
      {
        onError: () => {
          toast.error("Internal server error");
        },
        onSuccess: () => {
          toast.success("User createed successfully");
          logIn.mutate(
            {
              email,
              password,
            },
            {
              onError: () => {
                toast.error("Invalid email or password");
              },
              onSuccess(data) {
                toast.success("Logged in successfully");
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
        <Button className="w-2/5" color="primary" type="submit">
          Register
        </Button>
        <p className="flex flex-col">
          Already have an account? <Link href="/log-in">Login</Link>
        </p>
      </div>
    </form>
  );
};

export default SignupPage;
