import React from "react";
// router v6
import { Link } from "react-router-dom";
// store Zustand
import useAuthStore from "@/store/authStore";
// components
import { buttonVariants } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "../ui/avatar";
import NavigationLink from "./NavigationLink";
import { ThemeToggle } from "../theme/ThemeToggle";

export default function Navigation() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const abbreviation = useAuthStore((state) => state.abbreviation);
  const logout = useAuthStore((state) => state.logout);

  return (
    <header className="relative z-[50] hidden md:block">
      <div className="fixed left-1/2 top-0 h-[4.5rem] w-full -translate-x-1/2">
        <nav className="border-b border-border/80 bg-transparent px-6 py-5 backdrop-blur">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-x-8">
              <Link to={"/"}>{/* logo */}</Link>
              <div className="flex items-center gap-x-4">
                <NavigationLink url="/" value={"home"} />
              </div>
            </div>
            <div className="flex justify-center items-center"></div>
            <div className="flex items-center gap-x-4">
              <ThemeToggle />
              {isAuthenticated && (
                <Avatar>
                  <AvatarFallback>{abbreviation}</AvatarFallback>
                </Avatar>
              )}
              {isAuthenticated ? (
                <Link
                  to={"/"}
                  onClick={() => {
                    logout(); // Utilisez la fonction logout du store
                  }}
                  className={buttonVariants({
                    size: "default",
                  })}
                >
                  Logout
                </Link>
              ) : (
                <Link
                  to={"/login"}
                  className={buttonVariants({
                    size: "default",
                  })}
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
