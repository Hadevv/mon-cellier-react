import React, { useState } from "react";
// router v6
import { useNavigate } from "react-router-dom";
import GuestLayout from "@/layouts/GuestLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import PrimaryLink from "@/components/navigation/PrimaryLink";

const API_URL = "https://cruth.phpnet.org/epfc/caviste/public/index.php/";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  // router v6 : useNavigate
  const history = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Construire les informations d'identification encodées en base64
    const credentials = btoa(`${username}:${password}`);

    try {
      const response = await fetch(`${API_URL}api/users/authenticate`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Authorization: `Basic ${credentials}`,
        },
      });

      if (!response.ok) {
        throw new Error("Authentication failed");
      }

      const data = await response.json();
      console.log(data);

      // Rediriger vers la page d'accueil après une authentification réussie
      // router v6
      history("/");
    } catch (error) {
      console.error("Authentication failed", error);
      setError("Authentication failed");
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
