"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeUser, updateUser } from "@/stores/authSlice";
import { AuthSliceState, CartProduct, ThemeSliceState } from "@/types";
import { useRouter } from "next/navigation";
import { toggleTheme } from "@/stores/themeSlice";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu, Moon, ShoppingCart, Sun, User } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { brandName, links, brandAbbr } from "@/app/constants";
import { useGetCart, useLoginMut } from "@/services/mutations";
import Image from "next/image";
import { useQueryClient } from "@tanstack/react-query";
import { useRemoveFromCartMut } from "@/services/mutations";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useLoginModal } from "@/context/LoginModalContext";

export default function NavigationMenu() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { toast } = useToast();

  const { user } = useSelector((state: AuthSliceState) => state.auth);
  const { isDark } = useSelector((state: ThemeSliceState) => state.theme);
  const { data, mutate } = useGetCart();
  const login = useLoginMut();
  const cart = data?.data.cart || [];
  const queryClient = useQueryClient();
  const removeFromCart = useRemoveFromCartMut();

  const { isLoginOpen, setIsLoginOpen } = useLoginModal();
  const [open, setOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const isLoggedIn = useSelector(
    (state: AuthSliceState) => state.auth.isLoggedIn
  );
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    login.mutate(
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
        },
      }
    );
  };

  useEffect(() => {
    mutate(window.localStorage.getItem("uid")!);
  }, [cartOpen]);

  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };

  useEffect(() => {
    if (isDark) {
      document.querySelector("body")!.classList.add("dark");
    } else {
      document.querySelector("body")!.classList.remove("dark");
    }
  }, [isDark]);

  const handleLogout = () => {
    dispatch(removeUser());
    window.localStorage.removeItem("token");
    toast({
      title: "Success",
      description: "Logged out successfully",
    });
  };

  return (
    <nav
      className={`fixed top-0 z-20 w-full h-16 flex justify-between px-2 items-center ${
        isDark ? "bg-[rgba(10,10,10,0.5)]" : "bg-[rgba(255,255,255,0.5)]"
      } backdrop-blur-md`}
    >
      <div className="flex items-center gap-2">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger>
            <Button variant={"outline"} className="md:hidden">
              <Menu size={24} />
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle>
                <Link href="/">{brandName}</Link>
              </SheetTitle>
            </SheetHeader>
            <div className="flex flex-col items-center gap-1 mt-5">
              {links.map((link, i) => (
                <Button
                  key={i}
                  onClick={() => {
                    setOpen(false);
                    router.push(link.url);
                  }}
                  variant={"ghost"}
                >
                  <span className="w-full text-left">{link.name}</span>
                </Button>
              ))}
            </div>
            <div className="flex w-full justify-center mt-5 items-center gap-2">
              <Label htmlFor="theme-toggle">
                <Moon />
              </Label>
              <Switch
                checked={!isDark}
                onCheckedChange={handleToggleTheme}
                id="theme-toggle"
              />
              <Label htmlFor="theme-toggle">
                <Sun />
              </Label>
            </div>
          </SheetContent>
        </Sheet>
        <Link href="/" className="hidden md:flex">
          <h4 className="heading">{brandAbbr}</h4>
        </Link>
      </div>

      <div className="hidden md:flex gap-5">
        {links.map((link, i) => (
          <Link href={link.url} key={i} className={link.className}>
            {link.name}
          </Link>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <Sheet open={cartOpen} onOpenChange={setCartOpen}>
          <SheetTrigger className={`${isLoggedIn ? "block" : "hidden"}`}>
            <Button>
              <ShoppingCart size={24} />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <h2>My Cart</h2>
            </SheetHeader>
            <div className="flex flex-col gap-2">
              {cart?.products?.length === 0 ? (
                <p>
                  Your cart is empty. <br /> Add some items to get started
                </p>
              ) : (
                cart?.products?.map((product: CartProduct, index: number) => (
                  <div
                    key={index}
                    className="border rounded-md flex w-full gap-2 p-2"
                  >
                    <Image
                      className="aspect-square rounded-md"
                      src={product.item.image}
                      alt={product.item.name}
                      height={100}
                      width={100}
                    />
                    <div className="flex flex-col w-full justify-center gap-2">
                      {product.item.name}
                      <div className="flex justify-between items-center">
                        <span className="mr-3">Qty: {product.quantity}</span>
                        <span>INR {product.item.price}</span>
                      </div>
                      <Button
                        onClick={() => {
                          removeFromCart.mutate(
                            {
                              productId: product._id,
                              userId: user?._id ?? "",
                            },
                            {
                              onSuccess: async () => {
                                await queryClient.invalidateQueries({
                                  queryKey: ["cart", user?._id],
                                });
                                mutate(window.localStorage.getItem("uid")!);
                                toast({
                                  title: "Success",
                                  description: "Product removed from cart",
                                });
                              },
                            }
                          );
                        }}
                        variant={"destructive"}
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
            <div className="mt-5 flex flex-col gap-2">
              <Button
                onClick={() => {
                  router.push("/cart");
                  setCartOpen(false);
                }}
              >
                View Cart
              </Button>
              <Button
                variant={"outline"}
                onClick={() => {
                  router.push("/checkout");
                  setCartOpen(false);
                }}
              >
                Checkout
              </Button>
            </div>
          </SheetContent>
        </Sheet>

        <div className="hidden md:flex items-center gap-2">
          <Label htmlFor="theme-toggle">
            <Moon />
          </Label>
          <Switch
            checked={!isDark}
            onCheckedChange={handleToggleTheme}
            id="theme-toggle"
          />
          <Label htmlFor="theme-toggle">
            <Sun />
          </Label>
        </div>

        {isLoggedIn ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant={"secondary"}>
                <span className="hidden md:flex">{user?.name}</span>
                <User className="md:hidden" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="bottom" className="mr-10 md:mr-0">
              <Button
                className="w-full"
                variant={"destructive"}
                onClick={handleLogout}
              >
                Log out
              </Button>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Dialog open={isLoginOpen} onOpenChange={setIsLoginOpen}>
            <DialogTrigger asChild>
              <Button>Login</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Welcome to the shop! 🛒</DialogTitle>
                <DialogDescription>
                  Login to your account to continue shopping
                </DialogDescription>
              </DialogHeader>
              <Input
                required
                type="email"
                aria-label="Email"
                placeholder="Email address"
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                required
                type="password"
                aria-label="Password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="flex justify-between gap-4 w-full">
                <Button
                  onClick={() => {
                    setIsLoginOpen(false);
                    router.push("/sign-up");
                  }}
                >
                  No account?&nbsp; Sign up
                </Button>
                <Button
                  className="w-2/5"
                  color="primary"
                  onClick={handleSubmit}
                >
                  Login
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </nav>
  );
}
