"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";

import { useLoginMut } from "@/services/mutations";
import { updateUser } from "@/stores/authSlice";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

const LoginPage = () => {
  const { toast } = useToast();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();

  const { mutate } = useLoginMut();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    mutate(
      { email, password },
      {
        onError: (error) => {
          toast({
            variant: "destructive",
            title: "Error",
            description: error.name ?? "Internal server error",
          });
        },
        onSuccess: (data) => {
          toast({
            title: "Success",
            description: "Logged in successfully",
          });
          dispatch(updateUser(data.data));
          router.push("/");
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
      <p className="text-center">Login to your account to continue shopping</p>
      <Input
        required
        color="default"
        defaultValue={email}
        type="email"
        aria-label="Email"
        placeholder="Email address"
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        required
        color="default"
        defaultValue={password}
        type="password"
        aria-label="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <div className="flex justify-between gap-4 w-full">
        <p className="flex items-center">
          No account?&nbsp;<Link href="/sign-up">Sign up</Link>
        </p>
        <Button className="w-2/5" color="primary" type="submit">
          Login
        </Button>
      </div>
    </form>
  );
};

export default LoginPage;
