"use client"
import AddItem from "@/app/Page/product/addItems/AddItem";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";

interface Product {
  id: number;
  resto: [];
  card: [];
}

interface ProductListProps {
  product: Product[];
  setshowitemList: Function;
}

const ItemsList: React.FC<ProductListProps> = ({ product, setshowitemList }) => {
  
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [items, setItems] = useState<any>([]);
  const cat: any = localStorage.getItem("card");
  const card = JSON.parse(cat || "{}");

  useEffect(() => {
    console.log("Retrieved card:", Object.keys(card.categories.items));
    setItems(Object.values(card.categories.items) ?? []);
  }, []);

  const handleClick = () => {
    setShowModal(true); // Ouvrir le modal lorsqu'on clique sur le bouton
  };

  return (
    <div>
      <h2> Liste des Items</h2>

      <table className="table">
        <thead>
          <tr>
            <th>title</th>
            <th>image</th>
            <th>price</th>
          </tr>
        </thead>
        <tbody>
          {items.map((index: number) => (
            <tr key={index}>
              <td>
                <h5>{items[index].title}</h5>
              </td>
              <td>
                <img
                  style={{ width: "10%", alignItems: "center" }}
                  src={items[index].imageUrl.Default.urlDefault}
                  alt={items[index].title} // Ajout d'un attribut alt pour l'accessibilité
                />
              </td>
              <td>
                <h5>{items[index].price.priceHT}</h5>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Button onClick={handleClick}>ajouter items</Button>
      <Button onClick={() => { setshowitemList(false) }}>Retour</Button>

      {showModal && (
        <AddItem showModal={showModal} setShowModal={setShowModal} />
      )}
    </div>
  );
};

export default ItemsList;
