import React, { useState } from "react";
import { useSignupMut, useLoginMut } from "@/services";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { updateUser } from "@/stores/authSlice";
import { useDispatch } from "react-redux";
import { useToast } from "@/hooks/use-toast";
import { useLoginModal } from "@/context/LoginModalContext";

const useFormState = (initialState) => {
  const [formState, setFormState] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return [formState, handleChange];
};

const SignUp = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const signUp = useSignupMut();
  const logIn = useLoginMut();
  const { setIsLoginOpen } = useLoginModal();

  const [isSigningUp, setIsSigningUp] = useState(false);
  const [formState, handleFormChange] = useFormState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const validateForm = () => {
    if (
      !formState.firstName ||
      !formState.lastName ||
      !formState.email ||
      !formState.password
    ) {
      toast({
        title: "Missing fields",
        description: "Please fill in all fields.",
        variant: "destructive",
      });
      return false;
    }
    // Basic email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formState.email)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return false;
    }
    // Password strength check (min 6 chars, mix of letters and numbers)
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
    if (!passwordRegex.test(formState.password)) {
      toast({
        title: "Weak password",
        description:
          "Password must be at least 6 characters long and contain both letters and numbers.",
        variant: "destructive",
      });
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSigningUp(true);
    if (!validateForm()) {
      setIsSigningUp(false);
      return;
    }

    signUp.mutate(
      {
        name: `${formState.firstName} ${formState.lastName}`,
        email: formState.email,
        password: formState.password,
      },
      {
        onSettled: () => {
          setIsSigningUp(false);
        },
        onError: (error) => {
          const errorMessage =
            error.response?.data?.message ||
            "An error occurred. Please try again.";
          toast({
            title: "Error",
            description: errorMessage,
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
              email: formState.email,
              password: formState.password,
            },
            {
              onError: (error) => {
                const errorMessage =
                  error.response?.data?.message ||
                  "Login failed. Please try again.";
                toast({
                  title: "Login Error",
                  description: errorMessage,
                  variant: "destructive",
                });
              },
              onSuccess: (data) => {
                toast({
                  title: "Welcome back!",
                  description: "You are now logged in",
                });
                navigate("/dashboard"); // Redirect to dashboard
                dispatch(updateUser(data.data));
              },
            }
          );
        },
      }
    );
  };

  return (
    <section className="px-2 flex flex-col md:flex-row justify-center items-center gap-4">
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
            name="firstName"
            value={formState.firstName}
            onChange={handleFormChange}
            aria-label="First name"
            placeholder="First name"
            required
            color="default"
          />
          <Input
            name="lastName"
            value={formState.lastName}
            onChange={handleFormChange}
            aria-label="Last name"
            placeholder="Last name"
            required
            color="default"
          />
        </div>
        <Input
          name="email"
          value={formState.email}
          onChange={handleFormChange}
          aria-label="Email"
          placeholder="Email address"
          required
          color="default"
          type="email"
        />
        <Input
          name="password"
          value={formState.password}
          onChange={handleFormChange}
          aria-label="Password"
          placeholder="Password"
          required
          color="default"
          type="password"
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
            onClick={() => setIsLoginOpen(true)}
          >
            Already have an account? Login
          </p>
        </div>
      </form>
      <img
        alt="Signup page image"
        src="https://images.unsplash.com/photo-1728388939226-3fc095526a91?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        className="h-nav-full w-full object-cover object-left-center max-w-full md:max-w-[50%] rounded-lg"
      />
    </section>
  );
};

export default SignUp;
