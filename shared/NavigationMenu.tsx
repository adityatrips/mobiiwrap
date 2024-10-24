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
import { brandName, links } from "@/app/constants";

export default function NavigationMenu() {
  const router = useRouter();
  const dispatch = useDispatch();

  const { isDark } = useSelector((state: ThemeSliceState) => state.theme);

  const [open, setOpen] = React.useState(false);
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
      } flex justify-between items-center backdrop-blur-md px-2`}
    >
      <div className="flex items-center gap-2">
        <Sheet open={open}>
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
        <Button
          className={`${isLoggedIn ? "block" : "hidden"}`}
          onClick={() => router.push("/cart")}
        >
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
                <Button variant={"outline"}>Authenticate</Button>
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
            {/* <Button
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
            </Button> */}
          </>
        )}
      </div>
    </nav>
  );
}
