"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

import ModalItem from "./ModalItem";

interface Product {
  id: string;
  title: string;
  price: {
    priceHT: string;
  };
  imageUrl: {
    Default: {
      urlDefault: string;
    };
  };
}


function CardProduct() {  
  // const card:any = JSON.parse(localStorage.getItem("card")??""); 
  const categoryId:any = localStorage.getItem("idCategorie"); 
   const router = useRouter();

  const [modal, setModal] = useState(false);
  const [Item, setItem] = useState<any>();
  const [card, setCard] = useState<any>([]);
 const handleClick = (product:any) => {
        handleCommandeClick(product);
      };
  const handleCommandeClick = (item: string) => {
    setItem(item);
    setModal(true);
  };
    const fetchProducts = async () => {
      const idOfShop = localStorage.getItem("idOfShop");
   
      try {
        const response = await fetch(
          `http://localhost:8000/backend/restaurant/${idOfShop}/${categoryId}/product`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );
        if (response.ok) {
          const data = await response.json();
          console.log({data});
          
          setCard(data);
        } else {
          console.error("Failed to fetch products");
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }
  
  React.useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <React.Fragment>{card.map((product:any,key:number) => 
    { return(  <div className="row row-cols-1 row-cols-md-4">
          <div className="shop-content" style={{ width: "18rem" }}>
            <div className="product-box">
              <img
                className="product-img"
                src={ product?.imageUrl?.Default?.urlDefault ||
                  "https://www.commande-pizzatime.fr/CESARWEB_WEB/repimage/83bbc4350c114000b0e2d6c4ff204215/3/web/Famille122.webp"}
                alt="Card image cap"
                onClick={()=>handleClick(product)}
              />
              <div className="d-flex justify-content-center">
                <div className="d-flex flex-column bd-highlight mb-3">
                  <div className="p-2 bd-highlight">
                    <h5 className="product-title">
                      {product?.title}
                    </h5>
                  </div>
                  <div className="p-2 bd-highlight d-flex justify-content-center">
                    <span className="cart-price" style={{ color: "red" }}>
                      {product?.price?.priceHT || 0} €
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>)})}
        {modal && <ModalItem modal={modal} setModal={setModal} Item={Item} />}

  {/* </div>)}
    )} */}
    </React.Fragment>
    // <div className="shop container">
    //   <div className="my-2">
    //     <h5 className="card-title my-5">
    //       {card?.categories[categoryId]?.title}
    //     </h5>
      //   <div className="row row-cols-1 row-cols-md-4">
      //     {card?.categories[categoryId]?.items.map((keyItem: any) => {
      //       const imageUrl =
      //         card?.items[keyItem]?.imageUrl?.Default?.urlDefault ||
      //         "https://www.commande-pizzatime.fr/CESARWEB_WEB/repimage/83bbc4350c114000b0e2d6c4ff204215/3/web/Famille122.webp";
      //       const handleClick = () => {
      //         handleCommandeClick(card?.items[keyItem]);
      //       };
      //      return  ( <div className="col-md-4 my-3" key={keyItem}>
      //           <div className="shop-content" style={{ width: "18rem" }}>
      //             <div className="product-box">
      //               <img
      //                 className="product-img"
      //                 src={imageUrl}
      //                 alt="Card image cap"
      //                 onClick={handleClick}
      //               />
      //               <div className="d-flex justify-content-center">
      //                 <div className="d-flex flex-column bd-highlight mb-3">
      //                   <div className="p-2 bd-highlight">
      //                     <h5 className="product-title">
      //                       {card?.items[keyItem]?.title}
      //                     </h5>
      //                   </div>
      //                   <div className="p-2 bd-highlight d-flex justify-content-center">
      //                     <span className="cart-price" style={{ color: "red" }}>
      //                       {card?.items[keyItem]?.price?.priceHT || 0} €
      //                     </span>
      //                   </div>
      //                 </div>
      //               </div>
      //             </div>
      //           </div>
      //         </div>)
            
      //     })}
      //   </div>
      // </div>
    //   {modal && <ModalItem modal={modal} setModal={setModal} Item={Item} />}
    // </div>
  );
}

export default CardProduct;
