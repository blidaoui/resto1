"use client"
import React from 'react'
import { useRouter } from "next/navigation";

function CardCategorie({ showModal, setShowModal }: any) {
  const router = useRouter();

  const cat: any = localStorage.getItem("card");

  let card = JSON.parse(cat || null);
  const handleValidateClick = (idCategorie:string) => {
        localStorage.setItem("idCategorie",idCategorie)
      router.push("/Page/ListProduit");
  };
 
  return (
    <div className="shop container">
      <div className="row row-cols-1 row-cols-md-4">
        {Object.keys(card?.categories).map((key:any) => (
          <div className="col-sm my-3" key={key}>
            <div className="shop-content" style={{ width: '18rem' }} onClick={()=>handleValidateClick(key)}   >
             <div className="product-box">
              <h5 className="card-title" style={{ textAlign: "center" }}>{card?.categories[key]?.title}</h5>
                <img className="product-img" src={card?.categories[key]?.imageUrl.Default.urlDefault ? card?.categories[key].imageUrl.Default.urlDefault : "https://www.commande-pizzatime.fr/CESARWEB_WEB/repimage/83bbc4350c114000b0e2d6c4ff204215/3/web/Famille122.webp"} alt="Card image cap"  />
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  )
};
export default CardCategorie
