"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { removeUser } from "@/stores/authSlice";
import { AuthSliceState, ThemeSliceState } from "@/types";
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
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu, Moon, ShoppingCart, Sun, User } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import toast from "react-hot-toast";

const links = [
  {
    name: "About",
    url: "/about",
    className: "",
  },
  {
    name: "Products",
    url: "/products",
    className: "",
  },
  {
    name: "Feeling Lucky",
    url: "/feeling-lucky",
    className: "block md:hidden",
  },
];

export default function NavigationMenu() {
  const router = useRouter();
  const dispatch = useDispatch();

  const { isDark } = useSelector((state: ThemeSliceState) => state.theme);

  const user = useSelector((state: AuthSliceState) => state.auth.user);
  const isLoggedIn = useSelector(
    (state: AuthSliceState) => state.auth.isLoggedIn
  );

  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };

  useEffect(() => {
    if (isDark) {
      document.querySelector("body")!.classList.add("dark");
    } else {
      document.querySelector("body")!.classList.remove("dark");
    }
  }, []);

  const handleLogout = () => {
    dispatch(removeUser());
    window.localStorage.removeItem("token");
    toast.success("Logged out successfully");
  };

  const dropdownRef = React.useRef(null);

  return (
    <nav
      className={`z-20 fixed h-16 w-full ${
        isDark ? "bg-[rgba(10,10,10,0.5)]" : "bg-[rgba(255,255,255,0.5)]"
      } px-10 flex justify-between items-center backdrop-blur-md`}
    >
      <div className="flex items-center gap-2">
        <Sheet>
          <SheetTrigger>
            <Button variant={"outline"} className="md:hidden">
              <Menu size={24} />
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle className="heading">
                <Link href="/">MobiiWrap</Link>
              </SheetTitle>
            </SheetHeader>
            <SheetDescription>
              Welcome to MobiiWrap, your one-stop shop for all your wrapping.
            </SheetDescription>

            <div className="flex flex-col gap-1 mt-5">
              {links.map((link, i) => (
                <Button
                  key={i}
                  onClick={() => {
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
              <Switch onCheckedChange={handleToggleTheme} id="airplane-mode" />
              <Label htmlFor="airplane-mode">
                <Sun />
              </Label>
            </div>
          </SheetContent>
        </Sheet>
        <Link href="/">
          <h3>MobiiWrap</h3>
        </Link>
      </div>

      <div className="md:flex hidden gap-2">
        {links.map((link, i) => (
          <Link href={link.url} key={i} className={link.className}>
            {link.name}
          </Link>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <Button onClick={() => router.push("/cart")}>
          <ShoppingCart size={24} />
        </Button>

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
                  router.push("/cart");
                }}
              >
                Cart
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
            <Button
              onClick={() => {
                router.push("/log-in");
              }}
              variant={"outline"}
            >
              Login
            </Button>
            <Button
              onClick={() => {
                router.push("/sign-up");
              }}
            >
              Register
            </Button>
          </>
        )}
      </div>
    </nav>
  );
}
