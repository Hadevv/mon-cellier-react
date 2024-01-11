import React from "react";
import { Link } from "react-router-dom";
import useAuthStore from "@/store/authStore";
import { buttonVariants } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "../ui/avatar";
import NavigationLink from "./NavigationLink";
import { ThemeToggle } from "../theme/ThemeToggle";

export default function Navigation() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const abbreviation = useAuthStore((state) => state.abbreviation);
  const logout = useAuthStore((state) => state.logout);

  return (
    <header className="relative z-[50]
    bg-red-500
    h-9
    w-44
    
    ">
      <nav className="">
        <div className="flex">
          <Link to={"/"}>{/* logo */}</Link>
          <div className="flex items-center gap-x-8">
            <NavigationLink url="/" value={"home"} />
          </div>
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
                  logout();
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
    </header>
  );
}
