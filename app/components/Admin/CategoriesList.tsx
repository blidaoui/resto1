"use client";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import ProduitList from "./ProduitList";
import { IoMdAdd } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import AjouterCategorie from "@/app/Page/product/AjouterCategorie/AjouterCategorie";

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
          <Button onClick={handleAddCategory} style={{float:"right"}}>
              <IoMdAdd /> 
            </Button>
          <table className="table">
            <thead>
              <tr>
                <th>Titre</th>
                <th>Image</th>
                <th>Supprimer</th>
                <th>Liste </th>
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
                    <Button onClick={() => handleDelete(categoryId)}><MdDelete /></Button>
                  </td>
                  <td>
                    <Button onClick={() => handleShowProducts(categoryId)}>produits</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          
          <Button onClick={() => setShowCatList(false)}>Retour</Button>
          {showModal && (
            <AjouterCategorie
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
