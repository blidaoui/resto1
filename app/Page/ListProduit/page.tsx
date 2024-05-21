"use client";
import React from "react";
import CardProduct from "./CardProduct";
import MenuCategorie from "../Boutique/MenuCategorie";
import "bootstrap/dist/css/bootstrap.min.css";
import Hero2 from "@/app/components/Hero2/Hero2";

function ListProduit() {
  return (
    <div>
      <Hero2 />
      <MenuCategorie />
      <CardProduct />
    </div>
  );
}

export default ListProduit;
