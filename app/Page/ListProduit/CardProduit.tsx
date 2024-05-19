"use client";
import React, { useState } from "react";
import ModalItem from "./ModalItem";
import { Button } from "react-bootstrap";
import { useRouter } from "next/navigation";

function CardProduit() {
  const [modal, setModal] = useState(false);
  const [Item, setItem] = useState<any>();
  const router = useRouter();

  const handleCommandeClick = (item: string) => {
    setItem(item);
    setModal(true);
  };
  const addItems = async () => {
    router.push("/Page/product/addItems");
  };

  const cat: any = localStorage.getItem("card");
  const idCategorie: any = localStorage.getItem("idCategorie");
  let card = JSON.parse(cat || null);

  return (
    <div className="shop container">
      <div className=" my-2 ">
        <h5 className="card-title my-5">
          {card?.categories[idCategorie]?.title}
        </h5>
        <div className="row row-cols-1 row-cols-md-4">
          {card?.categories[idCategorie]?.items.map((keyItem: any) => {
            console.log({ innerKey: card?.items[keyItem] });

            const imageUrl =
              card?.items[keyItem]?.imageUrl?.Default?.urlDefault ||
              "https://www.commande-pizzatime.fr/CESARWEB_WEB/repimage/83bbc4350c114000b0e2d6c4ff204215/3/web/Famille122.webp";
            const handleClick = () => {
              handleCommandeClick(card?.items[keyItem]);
            };

            return (
              <div className="col-md-4 my-3" key={keyItem}>
                <div className="shop-content" style={{ width: "18rem" }}>
                  <div className="product-box">
                    <img
                      className="product-img"
                      src={imageUrl}
                      alt="Card image cap"
                      onClick={handleClick}
                    />
                    <div className="d-flex justify-content-center">
                      <div className="d-flex flex-column bd-highlight mb-3">
                        <div className="p-2 bd-highlight">
                          <h5 className="product-title">
                            {card?.items[keyItem]?.title}
                          </h5>
                        </div>
                        <div className="p-2 bd-highlight  d-flex justify-content-center">
                          <span className="cart-price" style={{ color: "red" }}>
                            {card?.items[keyItem]?.price?.priceHT || 0} €
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div></div>
              </div>
            );
          })}
        </div>
      </div>

      <Button onClick={addItems}>addItems</Button>

      {modal && <ModalItem modal={modal} setModal={setModal} Item={Item} />}
    </div>
  );
}

export default CardProduit;
