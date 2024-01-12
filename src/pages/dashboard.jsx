import React, { useEffect, useState } from "react";
import AuthLayout from "@/layouts/AuthLayout";
import { getUsers } from "@/services/api/userService";

export default function Dashboard() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const userList = await getUsers();
      setUsers(userList);
    } catch (error) {
      console.error("Échec de la récupération des utilisateurs", error);
      setError(
        "Échec de la récupération des utilisateurs. Veuillez réessayer plus tard.",
      );
    }
  };

  return (
    <AuthLayout title={"Tableau de bord"}>
      <div className="mx-4 mt-8">
        <h2 className="text-2xl font-bold mb-4 text-center">Tableau de bord</h2>

        {error && (
          <p className="text-red-500 mb-4 text-center">Erreur : {error}</p>
        )}

        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Liste des utilisateurs */}
          {users.map((user) => (
            <li key={user.id} className="bg-white p-6 rounded-md shadow-md">
              <strong className="text-lg font-bold mb-2 block">ID:</strong>
              <span className="text-gray-700 mb-2 block">{user.id}</span>
              <strong className="text-lg font-bold mb-2 block">Login:</strong>
              <span className="text-gray-700 block">{user.login}</span>
            </li>
          ))}
        </ul>
      </div>
    </AuthLayout>
  );
}
