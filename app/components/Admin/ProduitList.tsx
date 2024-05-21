"use client";
import AddItem from "@/app/Page/product/addItems/AddItem";
import EditItem from "@/app/Page/product/updateItem/EditItem";
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
  // product,
  categoryId,
  setShowItemListe,
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [update, setUpdate] = useState<boolean>(false);
  const [showModal, setShowModal] = useState(false);
  const [editItemId, setEditItemId] = useState<string | null>(null);

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
  }, [categoryId, update]);

  const deleteItem = async (
    productId: number,
    categoryId: string,
    itemId: string
  ): Promise<void> => {
    try {
      const response = await fetch(
        `http://localhost:8000/backend/restaurant/deleteItem/${productId}/${categoryId}/${itemId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete item");
      }

      const cat: string | null = localStorage.getItem("card");
      const card = JSON.parse(cat || "{}");
      if (card.categories && card.categories[categoryId].items[itemId]) {
        delete card.categories[categoryId].items[itemId];
        localStorage.setItem("card", JSON.stringify(card));
      }

      setUpdate((prevUpdate) => !prevUpdate);
    } catch (error) {
      console.error("Error deleting item:", error);
      alert("Failed to delete item");
    }
  };

  const handleDelete = async (categoryId: string, itemId: string) => {
    const productId = localStorage.getItem("productId")
      ? parseInt(localStorage.getItem("productId") as string, 10)
      : null;
    if (!productId) {
      alert("No product found");
      return;
    }
    await deleteItem(productId, categoryId, itemId);
  };

  const handleAddItem = () => {
    setShowModal(true);
  };
  
  const handleEditItem = (itemId: string) => {
    setEditItemId(itemId);
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
    setUpdate(!update);
  };

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
              <Button onClick={() => handleEditItem(product.id)}>
                  Modifier
                </Button>
              </td>
              <td>
                <Button
                  onClick={() => handleDelete(categoryId!, product.id)}
                >
                  Supprimer
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Button onClick={() => setShowItemListe(false)}>
        Retour aux catégories
      </Button>
      <Button onClick={handleAddItem}>Ajouter produit</Button>
      {showModal && !editItemId && (
        <AddItem
          showModal={showModal}
          setShowModal={handleCloseModal}
          setUpdate={setUpdate}
          update={update}
        />
      )}
      {showModal && editItemId && (
        <EditItem
          showModal={showModal}
          setShowModal={handleCloseModal}
          setUpdate={setUpdate}
          update={update}
          itemId={editItemId}
          categoryId={categoryId!}
        />
      )}
    </div>
  );
};

export default ProduitList;
