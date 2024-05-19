"use client";
import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import Image from "next/image";
import moto from "../../../public/image/moto.png";
import panierrepas from "../../../public/image/panierrepas.png";
import "./Modal.css";
import { useRouter } from "next/navigation";
import { useSnapshot } from "valtio";
import store from "@/app/components/store";
import Subscriptions from "../Profile/Braintree";
import Cartes from "../Profile/Cartes";

const ModalCategorie: any = ({ showModal, setShowModal }: any) => {
  const toggle = () => setShowModal(!showModal);
  const router = useRouter();
  const panierSnapshot = useSnapshot(store);
  const [clicked, setClicked] = useState(false);

  const userId = localStorage.getItem("userId");
  let etat = "payé";

  const { selectedCategorie } = useSnapshot(store);
  console.log({ selectedCategorie });
  const [chosenOption, setChosenOption] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [currentDate, setCurrentDate] = useState(
    new Date().toISOString().slice(0, 10)
  ); // Récupère la date d'aujourd'hui

  const handleOptionClick = (option: string) => {
    setChosenOption(option);
  };

  const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedTime(event.target.value);
  };

  const handleValidateClick = async ({
    cartItem,
    id_user,
    etat,
    prix,
    ModeRetrait,
  }: any) => {
    const Panier = panierSnapshot.Panier;
    let DataCartItem: any = [];
    let TPrix: any = 0;
    for (let item of Panier) {
      TPrix += item.prix;
      DataCartItem.push({ ...item });
    }

    let body = {
      cartItem: { ...DataCartItem },
      id_user: Number(userId),
      etat: etat,
      prix: TPrix,
      ModeRetrait: {
        Mode: chosenOption,
        time: selectedTime,
      },
    };
    let response = await fetch(
      "http://localhost:8000/backend/panier/AddPanier",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }
    );

    if (selectedTime === "") {
      alert("insert time");
    } else if (chosenOption === "emporter") {
      router.push("/Page/Profile/Commande");
    } else if (chosenOption === "livraison") {
      alert("choose sale mode");
    }
    toggle();
  };

  // const handleCloseClick = () => {
  //   setModal(false);
  // };
  useEffect(() => {
    const currentTime = new Date().toLocaleTimeString("en-US", {
      hour12: false,
    });
    setSelectedTime(currentTime);
  }, []); // Utilisation de useEffect pour exécuter une fois après le rendu initial

  return (
    <Modal show={showModal} onHide={toggle}>
      <Modal.Header closeButton>
        <Modal.Title>Modes de retrait</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="options">
          <div>
            <Image
              src={panierrepas}
              alt="Emporter"
              onClick={() => handleOptionClick("emporter")}
              style={{
                backgroundColor: chosenOption === "emporter" ? "green" : "",
                borderRadius: "100%",
              }}
            />{" "}
            <br />
            <p style={{ marginTop: "1rem", marginBottom: "0.5rem" }}>
              A emporter
            </p>
          </div>
          <div>
            <Image
              src={moto}
              alt="Livraison"
              onClick={() => handleOptionClick("livraison")}
              style={{
                backgroundColor: chosenOption === "livraison" ? "green" : "",
                borderRadius: "100%",
              }}
            />
            <br />
            <p style={{ marginTop: "1rem", marginBottom: "0.5rem" }}>
              Livraison
            </p>
          </div>
        </div>
        <p
          style={{
            marginTop: "1rem",
            marginBottom: "0.5rem",
            textAlign: "center",
          }}
        >
          Aujourd'hui
        </p>
        <div className="time-input">
          <input
            type="time"
            value={selectedTime}
            onChange={handleTimeChange}
            min={new Date().toLocaleTimeString("en-US", { hour12: false })}
          />
        </div>
        <Cartes />
      </Modal.Body>
      <Modal.Footer className="footer">
        <Button onClick={handleValidateClick} className="button2">
          Valider
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalCategorie;
