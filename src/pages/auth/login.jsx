import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import GuestLayout from "@/layouts/GuestLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import PrimaryLink from "@/components/navigation/PrimaryLink";
import useAuthStore from "@/store/authStore";
import { authenticateUser } from "@/services/api/userService";

export default function Login() {
  const [error, setError] = useState(null);
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;

    try {
      const data = await authenticateUser(username, password);

      if (data.success) {
        login(username, password);
        navigate("/");
      } else {
        setError("Authentication failed. Please check your credentials.");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <GuestLayout title="Login" description="">
      <form onSubmit={handleSubmit}>
        <div>
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            name="username"
            type="text"
            autoFocus
            autoComplete="username"
            className="mt-1 block w-full"
            required
          />
        </div>

        <div className="mt-4">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            autoComplete="password"
            className="mt-1 block w-full"
            required
          />
        </div>

        {error && <p className="text-red-500 mt-2">{error}</p>}

        <div className="mt-4 flex items-center justify-between">
          <PrimaryLink to={"/"} value={"Home"} />
          <div>
            <PrimaryLink to={"/register"} value={"Register"} />
            <Button type="submit" className="ml-4">
              Log in
            </Button>
          </div>
        </div>
      </form>
    </GuestLayout>
  );
}

