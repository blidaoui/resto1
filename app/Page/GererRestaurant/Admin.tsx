"use client"
import React from "react";
import { Admin, Resource } from "react-admin";
import restProvider from "ra-data-simple-rest";

import UserList from "@/app/components/Admin/UserList";
import ProductList from "@/app/components/Admin/ProductList";
import CommandeList from "@/app/components/Admin/CommandeList";


const AdminPanel = () => {
  return (
    <div>
      <Admin dataProvider={restProvider("http://localhost:3000")}>
        <Resource name="utilisateurs" list={UserList}  />
        <Resource name="Restaurant" list={ProductList}  />
        <Resource name="Commandes" list={CommandeList}  />
      </Admin>
    </div>
  );
};

export default AdminPanel;
