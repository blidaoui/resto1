"use client";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";

interface Product {
  id: string;
  name: string;
  // autres propriétés
}

interface ProduitListProps {
    product: Product[];

  categoryId: string | null;
  setShowItemListe: (show: boolean) => void;
}

const ProduitList: React.FC<ProduitListProps> = ({  product ,categoryId, setShowItemListe }) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
   const productId=localStorage.getItem("productId")
    const fetchProducts = async () => {
      if (categoryId) {
        try {
          const response = await fetch(`http://localhost:8000/backend/restaurant/${productId}/${categoryId}/products`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          });
          if (response.ok) {
            const data = await response.json();
            setProducts(data);
          } else {
            console.error("Failed to fetch products");
          }
        } catch (error) {
          console.error("Error fetching products:", error);
        }
      }
    };

    fetchProducts();
  }, [categoryId]);

  return (
    <div>
      <h2>Liste des Produits</h2>
      <Button onClick={() => setShowItemListe(false)}>Retour aux catégories</Button>
      <ul>
        {products.map(product => (
          <li key={product.id}>{product.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default ProduitList;
