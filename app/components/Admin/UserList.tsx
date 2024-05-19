"use client";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { MdDelete } from "react-icons/md";

interface User {
  user_id: number;
  nom: string;
  prenom: string;
  email: string;
}


const UserList: React.FC<User> = (props) => {
  const [users, setUsers] = useState<User[]>([]);

  const deleteUsers = async (user_id: number) => {
    try {
      const response = await fetch(
        `http://localhost:8000/backend/user/${user_id}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        }
      );
      if (response.ok) {
        setUsers(users.filter((user) => user.user_id !== user_id));
      } else {
        console.error("Failed to fetch users");
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:8000/backend/user", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        if (response.ok) {
          const data = await response.json();
          setUsers(data); // Set the users state with the fetched data
        } else {
          console.error("Failed to fetch users");
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div {...props}>
      <h2> Liste des Utilisateurs</h2>

      <table className="table">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Prénom</th>
            <th>E-mail</th>
            <th>Supprimer</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.user_id}>
              <td>{user.nom}</td>
              <td>{user.prenom}</td>
              <td>{user.email}</td>
              <td>
                <Button onClick={() => deleteUsers(user.user_id)}>
                  <MdDelete />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
