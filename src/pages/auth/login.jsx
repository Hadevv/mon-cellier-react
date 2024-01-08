import React, { useState } from "react";
// router V6
import { useNavigate } from "react-router-dom";
import GuestLayout from "@/layouts/GuestLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import PrimaryLink from "@/components/navigation/PrimaryLink";
import useAuthStore from "@/store/authStore";
import { authenticateUser } from "@/services/api/apiService";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const login = useAuthStore((state) => state.login);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

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
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full"
            required
          />
        </div>

        {error && <p className="text-red-500 mt-2">{error}</p>}

        <div className="mt-4 flex items-center justify-between">
          <PrimaryLink to={"/"} value={"home"} />
          <div>
            <PrimaryLink to={"/register"} value={"register?"} />
            <Button type="submit" className="ml-4">
              Log in
            </Button>
          </div>
        </div>
      </form>
    </GuestLayout>
  );
}
