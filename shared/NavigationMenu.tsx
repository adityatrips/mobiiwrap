"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { removeUser } from "@/stores/authSlice";
import { AuthSliceState, CartProduct, ThemeSliceState } from "@/types";
import { useRouter } from "next/navigation";
import { toggleTheme } from "@/stores/themeSlice";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  ChevronRight,
  Menu,
  Moon,
  ShoppingCart,
  Sun,
  User,
} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { brandName, links } from "@/app/constants";
import { useGetCart } from "@/services/mutations";
import Image from "next/image";
import { useQueryClient } from "@tanstack/react-query";
import { useRemoveFromCartMut } from "@/services/mutations";
import { useToast } from "@/hooks/use-toast";

export default function NavigationMenu() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { toast } = useToast();

  const { user } = useSelector((state: AuthSliceState) => state.auth);
  const { isDark } = useSelector((state: ThemeSliceState) => state.theme);
  const { data, mutate } = useGetCart();
  const cart = data?.data.cart || [];
  const queryClient = useQueryClient();
  const removeFromCart = useRemoveFromCartMut();

  const [open, setOpen] = React.useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const isLoggedIn = useSelector(
    (state: AuthSliceState) => state.auth.isLoggedIn
  );

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

  const dropdownRef = React.useRef(null);

  return (
    <nav
      className={`z-20 fixed h-16 w-full ${
        isDark ? "bg-[rgba(10,10,10,0.5)]" : "bg-[rgba(255,255,255,0.5)]"
      } flex justify-between items-center backdrop-blur-md px-2`}
    >
      <div className="flex items-center gap-2">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger
            onClick={() => {
              setOpen((pv) => !pv);
            }}
          >
            <Button variant={"outline"} className="md:hidden">
              <Menu size={24} />
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle className="heading text">
                <Link href="/">{brandName}</Link>
              </SheetTitle>
            </SheetHeader>
            <SheetDescription>
              Welcome to {brandName}, your one-stop shop for all your wrapping.
            </SheetDescription>

            <div className="flex flex-col gap-1 mt-5">
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

            <div className="flex w-full justify-center mt-5 items-center space-x-2">
              <Label htmlFor="airplane-mode">
                <Moon />
              </Label>
              <Switch
                checked={!isDark}
                onCheckedChange={handleToggleTheme}
                id="airplane-mode"
              />
              <Label htmlFor="airplane-mode">
                <Sun />
              </Label>
            </div>
          </SheetContent>
        </Sheet>
        <Link href="/">
          <h4 className="heading">{brandName}</h4>
        </Link>
      </div>

      <div className="md:flex hidden gap-5">
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
            <SheetDescription>
              <span
                className="mt-2 mb-5 flex items-center underline uppercase font-[100] cursor-pointer"
                onClick={() => {
                  setCartOpen(false);
                }}
              >
                Continue shopping
                <ChevronRight />
              </span>
            </SheetDescription>
            <div className="flex flex-col gap-2">
              {cart?.products?.length == 0 ? (
                <p>
                  Your cart is empty. <br /> Add some items to get started
                </p>
              ) : (
                cart?.products?.map((product: CartProduct, index: number) => {
                  return (
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
                      <div className="w-full flex justify-center flex-col gap-2">
                        {product.item.name}
                        <div className="flex justify-between items-center">
                          <span className="mr-3">Qty: {product.quantity}</span>
                          <span>$ {product.item.price}</span>
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
                  );
                })
              )}
            </div>
            <SheetFooter>
              <div className="mt-5 flex w-full flex-col gap-2">
                <Button>View Cart</Button>
                <Button variant={"secondary"}>Checkout</Button>
              </div>
            </SheetFooter>
          </SheetContent>
        </Sheet>
        <div className="hidden md:flex items-center space-x-2">
          <Label htmlFor="airplane-mode">
            <Moon />
          </Label>
          <Switch
            checked={!isDark}
            onCheckedChange={handleToggleTheme}
            id="airplane-mode"
          />
          <Label htmlFor="airplane-mode">
            <Sun />
          </Label>
        </div>
        {isLoggedIn ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild ref={dropdownRef}>
              <Button variant={"secondary"}>
                <span className="hidden md:flex">{user?.name}</span>
                <User className="block md:hidden" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="bottom" className="mr-10 md:mr-0">
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => {
                  router.push("/profile");
                }}
              >
                Profile
              </DropdownMenuItem>
              <DropdownMenuSeparator />
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
          <>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant={"outline"}>
                  <span className="block md:hidden">Auth</span>
                  <span className="hidden md:block">Authenticate</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="bottom">
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() => {
                    router.push("/log-in");
                  }}
                >
                  Login
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() => {
                    router.push("/sign-up");
                  }}
                >
                  Register
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        )}
      </div>
    </nav>
  );
}
