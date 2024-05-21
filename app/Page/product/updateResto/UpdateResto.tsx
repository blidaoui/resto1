"use client";
import React, { SyntheticEvent, useState } from "react";
import { Button, Modal } from "react-bootstrap";

type UpdateRestoType = {
  showModalUpdate: boolean;
  setShowModalUpdate: Function;
  setUpdate: Function;
  update: boolean;
  selectedResto:any
};

export default function UpdateRestaurant({
  showModalUpdate,
  setShowModalUpdate,
  setUpdate,
  update,
  selectedResto
}: UpdateRestoType) {
  console.log({selectedResto});
  
  const [town, setTown] = useState(selectedResto.resto.town);
  const [Nature, setNature] = useState(selectedResto.resto.Nature);
  const [country, setCountry] = useState(selectedResto.resto.Country);
  const [image, setImage] = useState(selectedResto.resto.image);
  const [PostalCode, setPostalCode] = useState(selectedResto.resto.PostalCode);
  const [Company, setCompany] = useState(selectedResto.resto.Company);
  const [latitude, setlatitude] = useState(selectedResto.resto.latitude);
  const [longitude, setlongitude] = useState(selectedResto.resto.longitude);
  const [closingTime, setclosingTime] = useState(selectedResto.resto.closingTime);
  const [openingTime, setopeningTime] = useState(selectedResto.resto.openingTime);
  const [Address, setAddress] = useState(selectedResto.resto.Address);

  const updateProduct = async (e: SyntheticEvent) => {
    e.preventDefault();
    const shopDataString = localStorage.getItem("shop");
    const shopData = shopDataString ? JSON.parse(shopDataString) : {};
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
    let shopId: any = localStorage.getItem("shopLength");
    const productId = localStorage.getItem("productId")
      ? parseInt(localStorage.getItem("productId") as string, 10)
      : null;

    await fetch(`http://localhost:8000/backend/restaurant/${productId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        resto: {
          town: town,
          image: image,
          Nature: Nature,
          shopid: selectedResto.resto.shopid,
          Address: Address,
          Company: Company,
          Country: country,
          latitude: latitude,
          longitude: longitude,
          PostalCode: PostalCode,
          Responsible: "",
          closingTime: closingTime,
          openingTime: openingTime,
        },
      }),
    });

    shopId = Number(shopId);
    localStorage.setItem("shopLength", shopId);
    setUpdate(!update);
    setShowModalUpdate(false); // Close the modal
  };

  const handleCloseModal = () => {
    setUpdate(!update);
    setShowModalUpdate(false);
  };

  return (
    <div>
      <Modal show={showModalUpdate} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <h1>update restaurant</h1>{" "}
        </Modal.Header>
        <Modal.Body>
          <form className="form_main" action="">
            <div className="inputContainer">
            <label>Image</label>
              <input
              value={image}
                id="image"
                className="inputField"
                type="text"
                onChange={(e) => setImage(e.target.value)}
                required
              />
            </div>
            <div className="inputContainer">
              <label>Country</label>
              <input
              value={country}
                placeholder="Country"
                id="country"
                className="inputField"
                type="text"
                onChange={(e) => setCountry(e.target.value)}
                required
              />
            </div>{" "}
            <div className="inputContainer">
              <label>Town</label>
              <input
              value={town}
                placeholder="town"
                id="town"
                className="inputField"
                type="text"
                onChange={(e) => setTown(e.target.value)}
                required
              />
            </div>{" "}
            <div className="inputContainer">
              <label>Nature</label>
              <input
                            value={Nature}
                placeholder="nature"
                id="Nature"
                className="inputField"
                type="text"
                onChange={(e) => setNature(e.target.value)}
                required
              />
            </div>
            <div className="inputContainer">
              <label>NomCompany</label>
              <input
              value={Company}
                placeholder="nom restaurant"
                id="company"
                className="inputField"
                type="text"
                onChange={(e) => setCompany(e.target.value)}
                required
              />
            </div>
            <div className="inputContainer">
              <label>Address</label>
              <input
              value={Address}
                placeholder="Address"
                id="address"
                className="inputField"
                type="text"
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>
            <div className="inputContainer">
              <label>latitude</label>
              <input
                            value={latitude}

                placeholder="latitude"
                id="latitude"
                className="inputField"
                type="text"
                onChange={(e) => setlatitude(e.target.value)}
                required
              />
            </div>
            <div className="inputContainer">
              <label>longitude</label>
              <input
                            value={longitude}

                placeholder="longitude"
                id="longitude"
                className="inputField"
                type="text"
                onChange={(e) => setlongitude(e.target.value)}
                required
              />
            </div>
            <div className="inputContainer">
              <label>openingTime</label>
              <input
                            value={openingTime}

                placeholder="openingTime"
                id="openingTime"
                className="inputField"
                type="text"
                onChange={(e) => setopeningTime(e.target.value)}
                required
              />
            </div>
            <div className="inputContainer">
              <label>closingTime</label>
              <input
                            value={closingTime}

                placeholder="closingTime"
                id="closingTime"
                className="inputField"
                type="text"
                onChange={(e) => setclosingTime(e.target.value)}
                required
              />
            </div>
            <div className="inputContainer">
              <label>PostalCode</label>
              <input
                            value={PostalCode}

                placeholder="PostalCode"
                id="postalCode"
                className="inputField"
                type="text"
                onChange={(e) => setPostalCode(e.target.value)}
                required
              />
            </div>
            <Button onClick={updateProduct}>Modifier</Button>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
}
