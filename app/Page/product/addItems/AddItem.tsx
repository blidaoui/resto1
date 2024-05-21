"use client";

import React, { SyntheticEvent, useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";

type AddItemProps = {
  showModal: boolean;
  setShowModal: (show: boolean) => void;
  setUpdate: (update: boolean) => void;
  update: boolean;
};

const AddItem: React.FC<AddItemProps> = ({ showModal, setShowModal, setUpdate, update }) => {
  const [image, setImage] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [price, setPrice] = useState<string>("");

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    const id = uuidv4();
    const categorieID = localStorage.getItem("categorieID");
    const productId = localStorage.getItem("productId");

    if (!categorieID || !productId) {
      alert("Category or Product ID is missing");
      return;
    }

    const newItem = {
      id: [id],
      color: "#FFFFFF",
      price: {
        tva: 1,
        default: 0,
        priceHT: price,
        override: [],
      },
      ranks: {
        default: 1,
        orderOverride: [
          {
            Order: 1,
            IdShop: 2,
          },
        ],
      },
      steps: ["c2b3cf59-36dd-4a7d-a662-dc29a2bd233a"],
      title: title,
      unity: "",
      prSize: "0",
      archive: false,
      barCode: "",
      options: {},
      calories: 0,
      fidelity: 0,
      imageUrl: {
        Default: {
          urlDefault: image,
          salesSupport: [],
        },
      },
    };

    try {
      const response = await fetch(`http://localhost:8000/backend/restaurant/addItem/${productId}/${categorieID}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ card: { [id]: newItem } }),
      });

      if (!response.ok) {
        throw new Error("Failed to add item");
      }

      setUpdate(!update);
      setShowModal(false);
    } catch (error) {
      console.error("Error adding item:", error);
      alert("Failed to add item");
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setUpdate(!update); // Trigger update to refresh categories
  };

  return (
    <Modal show={showModal} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title className="text-center">Ajouter item</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Image</Form.Label>
            <Form.Control
              type="text"
              placeholder="Image URL"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Titre</Form.Label>
            <Form.Control
              type="text"
              placeholder="Titre"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Prix</Form.Label>
            <Form.Control
              type="text"
              placeholder="Prix"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Ajouter
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddItem;
