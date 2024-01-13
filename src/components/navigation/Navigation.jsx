import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import useAuthStore from "@/store/authStore";
import { buttonVariants } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "../ui/avatar";
import NavigationLink from "./NavigationLink";
import { ThemeToggle } from "../theme/ThemeToggle";
import logo from "../../../public/logo.svg";

export default function Navigation() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const abbreviation = useAuthStore((state) => state.abbreviation);
  const logout = useAuthStore((state) => state.logout);
  const [dashboardClicked, setDashboardClicked] = useState(false);
  const [showDashboardLink, setShowDashboardLink] = useState(false);
  const linkRef = useRef();
  const dashboardLinkRef = useRef();

  // useRef permet de récupérer un élément du DOM
  // handleLogoClick declenche le click sur le lien de la page d'accueil
  const handleLogoClick = () => {
    linkRef.current.click();
    setDashboardClicked(false);
    setShowDashboardLink(true);
  };
  // handleDashboardClick declenche le click sur le lien du dashboard
  const handleDashboardClick = () => {
    dashboardLinkRef.current.click();
    setDashboardClicked(true);
  };

  return (
    <header
      className="
    relative 
    z-[50]
    bg-[#AE1829]
    h-14
    m-4
    mx-20
    rounded-md
    shadow-md"
    >
      <nav
        className="
      flex
      items-center
      justify-between
      w-full
      h-full
      px-4"
      >
        <div
          className="
        flex
        items-center
        justify-between
        w-full"
        >
          <Link to={"/"} onClick={handleLogoClick}>
            <img
              src={logo}
              alt="Caviste logo"
              className="w-9 ml-6 -rotate-90
              transform
              transition-all
              duration-500
              hover:rotate-0
              hover:scale-70
              cursor-pointer"
              loading="lazy"
              ref={linkRef}
            />
          </Link>
          <div className="flex items-center gap-x-8">
            <NavigationLink url="/" value={"home"} />
          </div>

          {isAuthenticated && (
            <div
              className={`items-center gap-x-8 ${
                showDashboardLink ? "" : "hidden"
              }`}
            >
              <NavigationLink url="/dashboard" value={"dashboard"} />
            </div>
          )}

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
