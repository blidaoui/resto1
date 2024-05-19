"use client"
import React, { useEffect, useState } from "react";
import Hero2 from "@/app/components/Hero2/Hero2";
import { Panier } from "@/backend/src/panier/panier.entity";

const CommandeAnnulee = () => (

  <div className="invisiblemobile">
    <h5>
      <strong>Commande Annulée</strong>
    </h5>
  </div>
);

const NomBoutique = () => (
  <div className="col-xl-7 col-md-6 col-10 d-flex align-items-center my-1">
    PIZZA TIME GUYANCOURT
  </div>
);
interface Commande {
  id: number;
  etat: string;
  prix: string;
  id_user: number;
  createdAt: string;
  ModeRetrait: { Mode: string; time: string };
  cartItem: { [key: string]: { title: string } }; 
  etat_Commande:string;
}
function Page() {
  const [commande, setCommande] = useState<Commande[]>([]);
  const fetchCommande = async () => {
const user_id=localStorage.getItem("userId")
    try {
      const response = await fetch(`http://localhost:8000/backend/panier/${user_id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) { 
        const data = await response.json();
        setCommande(data);
        localStorage.setItem("panier", JSON.stringify(data.data.id));

      } else {
        console.error("Failed to fetch Commande");
      }
    } catch (error) {
      console.error("Error fetchingCommande:", error);
    }
  };
  useEffect(() => {
    fetchCommande();
  },[]);
  return (
    // <>
    //   <Hero2 />
    //   {commande.map((commandeItem: Commande) => (
    //   <div   key={commandeItem.id} className="card d-flex pl-4 invisiblemobile px-4 my-2">
    //     {Object.values(commandeItem.cartItem).map((item, index) => (
         
    //               <span key={index}>{item.title}</span> ))}
               
    //     <div   className="d-flex align-content-center my-3">
    //       <div className="row">
    //            <div className="col-sm-8 col-xl-6 col-md-7">
    //            {commandeItem.etat}
    //           <div className="row ">
               
    //             <div className="col-xl-4 col-md-5  d-flex align-items-center my-1">
    //               <strong>title</strong>
    //             </div>
    //             {/* {item.title} */}
    //           </div>
    //         </div>
    //         <div className="col-sm-4 col-xl-4 col-md-3 d-flex justify-content-center">
    //           <div className="row">

    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    //       ))}
    // </>
    <>
    <Hero2 />
    {commande.map((commandeItem: Commande) => (
      <div   key={commandeItem.id} className="card d-flex pl-4 px-4 my-2">
     
   
      <div  className="d-flex align-content-center my-3">
        <div className="row ESPACE_CMD">
          <div id="Mode de retrait" className="col-xl-1 col-md-1 col-2 d-flex justify-content-between align-items-center my-1">
           
          </div>
          <div className="col-xl-4 col-md-5 invisiblemobile d-flex align-items-center my-1">
            <strong> Commande  </strong>
          </div>   {Object.values(commandeItem.cartItem).map((item, index) => (
         
         <div className="col-xl-7 col-md-6 col-10 d-flex align-items-center my-1">  <span key={index}>{item.title}</span>    </div> ))}
     

          <div  className="col-xl-1 col-md-1 col-2 d-flex justify-content-between align-items-center my-1">
          
          </div>
          <div className="col-xl-4 col-md-5 invisiblemobile d-flex align-items-center my-1">
            <strong> Mode de retrait </strong>
          </div>
          
          <div className="col-xl-7 col-md-6 col-10 d-flex align-items-center my-1"> {commandeItem.ModeRetrait.Mode}</div>
          
          <div className="col-xl-4 col-md-5 invisiblemobile d-flex align-items-center my-1">
            <strong> Etat de commande</strong>
          </div>
          
          <div className="col-xl-7 col-md-6 col-10 d-flex align-items-center my-1"> {commandeItem.etat_Commande}</div>
          

          <div  className="col-xl-1 col-md-1 col-2 d-flex justify-content-between align-items-center my-1">
           
          </div>
          <div className="col-xl-4 col-md-5 invisiblemobile d-flex align-items-center my-1">
            <strong> Date de retrait </strong>
          </div>
          <div className="col-xl-7 col-md-6 col-10 d-flex align-items-center my-1">{commandeItem.ModeRetrait.time}</div>

          <div  className="col-xl-1 col-md-1 col-2 d-flex justify-content-between align-items-center my-1">
           
          </div>
          <div className="col-xl-4 col-md-5 invisiblemobile d-flex align-items-center my-1">
            <strong>État du paiement </strong>
          </div>
          <div className="col-xl-7 col-md-6 col-10 d-flex align-items-center my-1">{commandeItem.etat}</div>

          <div  className="col-xl-1 col-md-1 col-2 d-flex justify-content-between align-items-center my-1">
          
          </div>
          <div className="col-xl-4 col-md-5 invisiblemobile d-flex align-items-center my-1">
            <strong> Montant </strong>
          </div>
          <div className="col-xl-7 col-md-6 col-10 d-flex align-items-center my-1">{commandeItem.createdAt} €</div>
        </div>
      </div>
    </div>
    ))}
  </>
  );
}

export default Page;
