"use client";
import React, { SyntheticEvent, useState } from "react";
import { Button, Modal } from "react-bootstrap";

function  Addresto({showModal ,setShowModal ,setUpdate  , Update } :any) {
  const [town, setTown] = useState("");
  const [ Nature, setNature] = useState("");
  const [Country, setCountry] = useState("");
  const [image, setImage] = useState("");
  const [PostalCode, setPostalCode] = useState("");
  const [Company, setCompany] = useState("");
  const [latitude, setlatitude] = useState("");
  const [longitude, setlongitude] = useState("");
  const [closingTime, setclosingTime] = useState("");
  const [openingTime, setopeningTime] = useState("");
  const [Address, setAddress] = useState("");
  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    setShowModal(false);

    let shopId: any = localStorage.getItem("shopLength");

    await fetch("http://localhost:8000/backend/restaurant/addresto", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        resto: {
          town: town,
          image: image,
          Nature:  Nature,
          shopid: Number(shopId),
          Address: Address,
          Company: Company,
          Country: Country,
          latitude:  Number(latitude),
          longitude: Number(longitude),
          PostalCode:PostalCode,
          Responsible: "",
          closingTime: closingTime,
          openingTime: openingTime,
        },
        card: {
          etat: "En attente",
          tags: {},
          color: "#FFFFF",
          items: {
       
          },
          operator: "Administrateur",
          workflow: {
           
          },
        
          shoptitle: "boutique 01 catalogue ",
          categories: {},
          allergenGroups: {
            "7efb7e13-d542-4c20-8e36-535129686dcb": {
              icon: "",
              title: "GLUTIN",
              allergens: [
                "fe16508e-b58a-4372-b551-0b880d053593",
                "eca2695f-2970-4d92-a4b1-b5d3f99d4190",
                "867445e6-7ed8-46de-92ba-aeb4defe9bf6",
                "7f09729d-c128-4989-8033-a65619561953",
                "b130baf1-f098-474d-a529-8771b6db311e",
                "dc110013-6f2e-42e7-8747-165847ab0545",
              ],
            },
            "f56bb3e9-96d9-4c76-ac36-a4f61f9028c5": {
              icon: "",
              title: "FRUITS A COQUES",
              allergens: [
                "caf18793-6df7-4110-8720-25b4cf2bdead",
                "367e335f-6f35-4864-b0bf-e20c39be9a79",
                "62c7fc23-12cf-4a70-89a8-69a7a638986d",
                "d39bc94b-ae03-43e1-a52e-88b04c3a5744",
                "90f99eac-d484-4a38-aaf9-17b690bf6b94",
                "0b0800bb-3410-4018-b574-3d7bf0325bed",
                "b450efc7-0144-4a4c-8d07-4c012daa9457",
                "c3145fe7-aede-4a69-8429-155c00ae1446",
              ],
            },
          },
          dateModification: "Le 28/03/2024 à 10:57",
          iuudCardReference: "ab82c200-0f23-6bef-16f9-4b856d6dfcb4",
          isDesignationUnique: false,
          isReferenceAutomatic: false,
        },
      }),
    });
    setUpdate(!Update)
    shopId = Number(shopId) + 1;
    localStorage.setItem("shopLength", shopId);
  };
  const handleCloseModal = () => setShowModal(false);

  return (
    <div>
          <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>

      <h1>Ajouter restaurant</h1>
      </Modal.Header>
      <Modal.Body>

      <form className="form_main" action="">
        <div className="inputContainer">
          Image: 
          <input
           placeholder="Image"
            id="image"
            className="inputField"
            type="text"
            onChange={(e) => setImage(e.target.value)}
            required
          />
        </div>
        <div className="inputContainer">
          <label>Town: </label>
          <input
            placeholder="Town"
            id="Town"
            className="inputField"
            type="text"
            onChange={(e) => setTown(e.target.value)}
            required
          />
        </div>
        <div className="inputContainer">
          <label>NomCompany: </label>
          <input
            placeholder="nom restaurant"
            id="company"
            className="inputField"
            type="text"
            onChange={(e) => setCompany(e.target.value)}
            required
          />
        </div>
        <div className="inputContainer">
          <label>Country: </label>
          <input
            placeholder="Country"
            id="Country"
            className="inputField"
            type="text"
            onChange={(e) => setCountry(e.target.value)}
            required
          />
        </div>

        <div className="inputContainer">
          <label>Address: </label>
          <input
            placeholder="Address"
            id="address"
            className="inputField"
            type="text"
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <div className="inputContainer">
          <label>latitude: </label>
          <input
            placeholder="latitude"
            id="latitude"
            className="inputField"
            type="number"
            onChange={(e) => setlatitude(e.target.value)}
            required
          />
        </div>
        <div className="inputContainer">
          <label>longitude: </label>
          <input
            placeholder="longitude"
            id="longitude"
            className="inputField"
            type="number"
            onChange={(e) => setlongitude(e.target.value)}
            required
          />
        </div>
        <div className="inputContainer">
          <label>openingTime: </label>
          <input
            placeholder="openingTime"
            id="openingTime"
            className="inputField"
            type="text"
            onChange={(e) => setopeningTime(e.target.value)}
            required
          />
        </div>
        <div className="inputContainer">
          <label>closingTime: </label>
          <input
            placeholder="closingTime"
            id="closingTime"
            className="inputField"
            type="text"
            onChange={(e) => setclosingTime(e.target.value)}
            required
          />
        </div>
        <div className="inputContainer">
          <label>PostalCode: </label>
          <input
            placeholder="PostalCode"
            id="postalCode"
            className="inputField"
            type="text"
            onChange={(e) => setPostalCode(e.target.value)}
            required
          />
        </div>
        <div className="inputContainer">
          <label>Nature: </label>
          <input
            placeholder="Nature"
            id="postalCode"
            className="inputField"
            type="text"
            onChange={(e) => setNature(e.target.value)}
            required
          />
        </div>
        <Button onClick={handleSubmit}>Ajouter </Button>
      </form>
      </Modal.Body>

      </Modal>
    </div>
  );
}
export default Addresto;