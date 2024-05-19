"use client";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";

interface Product {
  id: string;
  title: string;
  price: {
    priceHT: string;
  };
  imageUrl: {
    Default: {
      urlDefault: string;
    };
  };
  // autres propriétés
}

interface ProduitListProps {
  product: Product[];

  categoryId: string | null;
  setShowItemListe: (show: boolean) => void;
}

const ProduitList: React.FC<ProduitListProps> = ({
  product,
  categoryId,
  setShowItemListe,
}) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const productId = localStorage.getItem("productId");
    const fetchProducts = async () => {
      if (categoryId) {
        try {
          const response = await fetch(
            `http://localhost:8000/backend/restaurant/${productId}/${categoryId}/product`,
            {
              method: "GET",
              headers: { "Content-Type": "application/json" },
            }
          );
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
      <table className="table">
        <thead>
          <tr>
            <th>Titre</th>
            <th>Image</th>
            <th>Prix</th>
            <th>Modifier</th>
            <th>Supprimer</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>
                <h5>{product?.title}</h5>
              </td>
              <td>
                <img
                  style={{ width: "10%" }}
                  src={product.imageUrl.Default.urlDefault}
                  alt={product.title}
                />
              </td>
              <td>
                <h5>{product.price.priceHT}</h5>
              </td>
              <td>
                <Button>Modifier</Button>
              </td>
              <td>
                <Button>supprimer</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Button onClick={() => setShowItemListe(false)}>
        Retour aux catégories
      </Button>
      <Button>Ajouter produit</Button>
    </div>
  );
};

export default ProduitList;
