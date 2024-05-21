"use client";
import React, { SyntheticEvent, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { v4 } from 'uuid';

import { addCategories } from "./Add";

type AddCategorieType = {
  showModal: boolean,
  setShowModal: Function,
  setUpdate: Function,
  update: boolean
}

export default function AjouterCategorie({ showModal, setShowModal, setUpdate, update }: AddCategorieType) {
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    const shopDataString = localStorage.getItem("shop");
    const shopData = shopDataString ? JSON.parse(shopDataString) : [];
    const idShop: any = localStorage.getItem("idResto");
    let IdCard = 0;
    let IndexCard = 0;

    for (let i = 0; i < shopData.length; i++) {
      const shop = shopData[i];
      if (shop.resto.shopid == idShop) {
        IdCard = shop.id;
        IndexCard = i;
      }
    }

    let id = v4();
    let NewCategories = addCategories(id, title, image, IndexCard);
    const productId=localStorage.getItem("productId")
    await fetch(`http://localhost:8000/backend/restaurant/${productId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        card: {
          [id]: { ...NewCategories }
        }
      }),
    });

    // Update local storage
    const cat: string | null = localStorage.getItem("card");
    const card = JSON.parse(cat || "{}");
    card.categories = { ...card.categories, [id]: NewCategories };
    localStorage.setItem("card", JSON.stringify(card));

    setUpdate(!update);
    setShowModal(false);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setUpdate(!update); // Trigger update to refresh categories
  };

  return (
    <Modal show={showModal} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>Ajouter catégorie</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form className="form_main" onSubmit={handleSubmit}>
          <div className="inputContainer">
          <label>Image</label>
            <input
              id="image"
              className="inputField"
              type="text"
              onChange={(e) => setImage(e.target.value)}
              placeholder="URL de l'image"
              required
            />
          </div>
          <div className="inputContainer">
            <label>Titre</label>
            <input
              id="Title"
              className="inputField"
              type="text"
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Titre"
              required
            />
          </div>
          <Button type="submit">Ajouter</Button>
        </form>
      </Modal.Body>
    </Modal>
  );
}
