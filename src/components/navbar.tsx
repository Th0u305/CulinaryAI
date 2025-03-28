"use client";

import React from "react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import ThemeToggle from "@/components/ThemeToggle";
import UserAvatar from "./UserAvatar";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  LoginLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { usePathname } from "next/navigation";
import useAllData from "@/hooks/useAllData";

const Navbar = () => {
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const isMobile = useIsMobile();
  const pathname = usePathname();
  const {isAuthenticated} = useAllData()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Recipes", path: "/recipes" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 animate-fade-in ease-in-out py-5",
        scrolled ? "backdrop-blur-xl shadow-xl" : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <h1 className={cn(
            "font-semibold tracking-tight text-xl md:text-2xl bg-clip-text text-white dark:text-transparent bg-gradient-to-r from-primary to-primary/70",
            scrolled ? "text-black" : ""
          )}>
            CulinaryAI
          </h1>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.path}
              className={cn(
                "text-md font-medium transition-colors hover:text-primary relative py-2",
                isActive(item.path)
                  ? 'text-primary after:content-[""] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary after:rounded-full'
                  : "dark:text-foreground/70 hover:text-foreground/90"
              )}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          {isAuthenticated  ? (
            <UserAvatar />
          ) : (
            <>
              <Button className="button-color bg-[#ff9e42] text-black hover:bg-[#ff9e42]">
                <LoginLink>Login</LoginLink>
              </Button>
              <Button className="button-color">
                <RegisterLink>SignUp</RegisterLink>
              </Button>
            </>
          )}

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-12 h-12 text-xl" />
            ) : (
              <Menu className="w-12 h-12 text-xl" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobile && mobileMenuOpen && (
        <div className="md:hidden glass animate-slide-in py-4 px-4 mt-2 mx-4 rounded-lg shadow-lg bg-white">
          <nav className="flex flex-col space-y-3">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.path}
                className={cn(
                  "px-4 py-2 text-md font-medium rounded-md transition-colors text-black",
                  isActive(item.path) ? "bg-primary/10" : "hover:bg-primary/5"
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
