"use client";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { MdDelete } from "react-icons/md";
import { GrUpdate } from "react-icons/gr";
import { IoMdAdd } from "react-icons/io";
import CategoriesList from "./CategoriesList";
import AjouterRestaurant from "@/app/Page/product/AjouterRestaurant/AjouterRestaurant";
import ModifierRestaurant from "@/app/Page/product/ModifierRestaurant/ModifierRestaurant";


interface Product {
  id: number;
  resto: { Company: string; shopid: number };
  card: { categories: any };
}

interface ProductListProps {
  product: Product[];
}

const ProductList: React.FC<ProductListProps> = (props) => {
  const [UpdateResto, setUpdateResto] = useState<boolean>(false);
  const [showModalUpdate, setShowModalUpdate] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [update, setUpdate] = useState<boolean>(false);
  const [categoriesUpdated, setCategoriesUpdated] = useState<boolean>(false); // New state
  const [product, setProduct] = useState<Product[]>([]);
  const [showcatList, setShowCatList] = useState(false);
  const [selectedResto, setSelectedResto] = useState({});

  const handleCategoriesUpdate:any = () => {
    setCategoriesUpdated((prev) => !prev);
  };

  const handlesubmit = (resto: any) => {
    localStorage.setItem("card", JSON.stringify({ categories: resto.card.categories }));
    localStorage.setItem("categories", JSON.stringify({ categories: resto.card.categories }));
    localStorage.setItem("idResto", JSON.stringify(resto.resto.shopid));
    localStorage.setItem("productId", JSON.stringify(resto.id));
    setShowCatList(true);
  };

  const deleteProducts = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:8000/backend/restaurant/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) {
        setProduct(product.filter((product) => product.id !== id));
      } else {
        console.error("Failed to fetch product");
      }
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:8000/backend/restaurant", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        if (response.ok) {
          const data = await response.json();
          setProduct(data);
        } else {
          console.error("Failed to fetch Products");
        }
      } catch (error) {
        console.error("Error fetching Products:", error);
      }
    };

    fetchProducts();
  }, [update, UpdateResto, categoriesUpdated]); // Add categoriesUpdated to dependencies

  const handleClick = () => {
    setShowModal(true);
  };
  
  const handleClickUpdate = (value: any) => {
    setSelectedResto(value)
    localStorage.setItem("productId", JSON.stringify(value.id)); // Set productId to localStorage
    setShowModalUpdate(true);
  };

  return (
    <div {...props}>
      {!showcatList ? (
        <div>
          <h2> Liste des Restaurants </h2>
          <Button onClick={handleClick} style={{float:"right"}}>
              <IoMdAdd /> 
            </Button>
          <table className="table">
            <thead>
              <tr>
                <th>Company</th>
                <th>Shop ID</th>
                <th>Modifier</th>
                <th>Supprimer</th>
                <th>liste</th>
              </tr>
            </thead>
            <tbody>
              {product.map((value: any) => (
                <tr key={value.id}>
                  <td>{value.resto.Company}</td>
                  <td>{value.resto.shopid}</td>
                  <td>
                    <Button onClick={() => handleClickUpdate(value)}>
                      <GrUpdate />
                    </Button>
                  </td>
                  <td>
                    <Button onClick={() => deleteProducts(value.id)}>
                      <MdDelete />
                    </Button>
                  </td>
                  <td>
                    <Button onClick={() => handlesubmit(value)}>
                      Categories
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
            
            {showModalUpdate && (
              <ModifierRestaurant
                showModalUpdate={showModalUpdate}
                setShowModalUpdate={setShowModalUpdate}
                setUpdate={setUpdate}
                update={update}
                selectedResto={selectedResto}
              />
            )}
            {showModal && (
              <AjouterRestaurant
                showModal={showModal}
                setShowModal={setShowModal}
                setUpdate={setUpdate}
                update={update}
              />
            )}
          </table>
        </div>
      ) : (
        <CategoriesList product={product} setShowCatList={setShowCatList} onCategoriesUpdate={handleCategoriesUpdate} /> // Pass the callback
      )}
    </div>
  );
};

export default ProductList;
