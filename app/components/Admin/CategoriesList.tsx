"use client";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import AddCategorie from "@/app/Page/product/addCategorie/AddCategorie";
import ProduitList from "./ProduitList";

interface Category {
  id: string;
  title: string;
  imageUrl: {  
    Default: {
      urlDefault: string;
    };
  };
}

interface Product {
  id: number;
  card: {
    categories: { [key: string]: Category };
  };
}

interface ProductListProps {
  product: Product[];
  setShowCatList: (show: boolean) => void;
  onCategoriesUpdate: any;
}

const CategoriesList: React.FC<ProductListProps> = ({ product, setShowCatList, onCategoriesUpdate }) => {
  const [showModal, setShowModal] = useState(false);
  const [update, setUpdate] = useState<boolean>(false);
  const [categories, setCategories] = useState<Record<string, Category>>({});
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [showItemListe, setShowItemListe] = useState(false);

  const productId = localStorage.getItem("productId") ? parseInt(localStorage.getItem("productId") as string, 10) : null;
  const deleteCategory = async ( productId:number ,categoryId: string): Promise<void> => {
    try {
      const response = await fetch(`http://localhost:8000/backend/restaurant/${productId}/${categoryId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete category");
      }

      const cat: string | null = localStorage.getItem("card");
      const card = JSON.parse(cat || "{}");
      if (card.categories && card.categories[categoryId]) {
        delete card.categories[categoryId];
        localStorage.setItem("card", JSON.stringify(card));
      }

      setUpdate(!update);
    } catch (error) {
      console.error("Error deleting category:", error);
      alert("Failed to delete category");
    }
  };

  const handleDelete = async (categoryId: string) => {
    const productId =localStorage.getItem("productId") ? parseInt(localStorage.getItem("productId") as string, 10) : null;

    if (!productId) {
      alert("No product found");
      return;
    }

    await deleteCategory(productId, categoryId);
  };

  const getCategorie = async () => {
    try {
      const response = await fetch(`http://localhost:8000/backend/restaurant/${productId}/categories`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) {
        const data = await response.json();
        setCategories(data);
      } else {
        console.error("Failed to fetch Categories");
      }
    } catch (error) {
      console.error("Error fetching Categories:", error);
    }
  };

  useEffect(() => {
    const productId = product[0]?.id;
    if (productId) {
      getCategorie();
    }
  }, [product, update]);

  const handleAddCategory = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setUpdate(!update);
  };

  const handleShowProducts = (categoryId: string) => {
    setSelectedCategoryId(categoryId);
    setShowItemListe(true);
    localStorage.setItem("categorieID", (categoryId));


  };

  return (
    <div>
      {!showItemListe ? (
        <div>
          <h2>Liste des Categories</h2>
          <table className="table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Image</th>
                <th>Actions</th>
                <th>Liste des produits</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(categories).map((categoryId, index) => (
                <tr key={index}>
                  <td>
                    <h5>{categories[categoryId].title}</h5>
                  </td>
                  <td>
                    <img
                      style={{ width: "10%" }}
                      src={categories[categoryId].imageUrl.Default.urlDefault}
                      alt={categories[categoryId].title}
                    />
                  </td>
                  <td>
                    <Button onClick={() => handleDelete(categoryId)}>Delete</Button>
                  </td>
                  <td>
                    <Button onClick={() => handleShowProducts(categoryId)}>Liste de produits</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <Button onClick={handleAddCategory}>Ajouter Categories</Button>
          <Button onClick={() => setShowCatList(false)}>Retour</Button>
          {showModal && (
            <AddCategorie
              showModal={showModal}
              setShowModal={handleCloseModal}
              setUpdate={setUpdate}
              update={update}
            />
          )}
        </div>
      ) : (
        <ProduitList categoryId={selectedCategoryId} setShowItemListe={setShowItemListe} />
      )}
    </div>
  );
};

export default CategoriesList;
