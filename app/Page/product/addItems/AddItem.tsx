// "use client"
// import React, { SyntheticEvent, useState } from "react";
// import { Button, Modal } from "react-bootstrap";
// import { useRouter } from "next/navigation";
// import { v4 } from 'uuid';

// export default function AddItem({ showModal, setShowModal }: any) {
//   const router = useRouter();
//   const [image, setImage] = useState("");
//   const [title, setTitle] = useState("");
//   const [price, setPrice] = useState("");
//   const handleSubmit = async (e: SyntheticEvent) => {
//     e.preventDefault();
//     let id=v4();
//     // Fetch API call here
//     setShowModal(false); // Close modal after submission
//   };

//   const handleCloseModal = () => setShowModal(false);
//   const toggle = () => setShowModal(!showModal);

//   return (
//     <div>
      
//       <Modal show={showModal} onHide={toggle}>
//         <Modal.Header closeButton>
//           <Modal.Title>Ajouter item</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <form className="form_main" onSubmit={handleSubmit}>
//             <div className="inputContainer">
//               <input
//                 id="image"
//                 className="inputField"
//                 type="text"
//                 onChange={(e) => setImage(e.target.value)}
//                 placeholder="Image URL"
//                 required
//               />
//             </div>
//             <div className="inputContainer">
//               <label>Title</label>
//               <input
//                 id="Title"
//                 className="inputField"
//                 type="text"
//                 onChange={(e) => setTitle(e.target.value)}
//                 placeholder="Title"
//                 required
//               />
//             </div>
//             <div className="inputContainer">
//               <label>price</label>
//               <input
//                 id="Price"
//                 className="inputField"
//                 type="text"
//                 onChange={(e) => setPrice(e.target.value)}
//                 placeholder="Price"
//                 required
//               />
//             </div>
//             <Button type="submit">Add</Button>
//           </form>
//         </Modal.Body>
//       </Modal>
//     </div>
//   );
// }
"use client"
import React, { SyntheticEvent, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useRouter } from "next/navigation";
import { v4 } from 'uuid';

export default function AddItem() {
  const router = useRouter();
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    let idCategorie=localStorage.getItem("idCategorie")
    let id=v4()

    await fetch(`http://localhost:8000/backend/restaurant/addItem/${card.id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
       card: {
             [id]: {
                id:[id],
                color: "#FFFFFF",
                price: {
                  tva: 1,
                  default: 0,
                  priceHT: price,
                  override: [],
                  advancedPrice: {
                    "06dfd3fb-80dd-558b-bea1-4b770bac6217": {
                      tva: 10,
                      priceHT: price,
                      pricettc: 0,
                      methodePrice: "",
                      scheduledPrice: [],
                      originalKeyElements: [
                        "8185fa67-f472-4173-a9b8-ec3dc79cd697",
                        "APP",
                      ],
                    },
                  },
                  saleModeVatRates: [
                    {
                      value: 10,
                      saleModeUuid: "3cb893e8-0f3a-4dcf-aab7-9545e97dfda7",
                    },
                    {
                      value: 10,
                      saleModeUuid: "8185fa67-f472-4173-a9b8-ec3dc79cd697",
                    },
                    {
                      value: 10,
                      saleModeUuid: "d95b28cd-21eb-42a1-87fc-4f8dc58af8d7",
                    },
                    {
                      value: 10,
                      saleModeUuid: "d99758ef-0049-4513-90fe-ca44bd069aac",
                    },
                  ],
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
                  override: [
                    {
                      shopId: "",
                    },
                    {
                      info: [],
                      salesSupport: [],
                    },
                  ],
                },
                printers: [],
                quantity: "0",
                sizeList: "0",
                variants: [],
                allergens: [],
                reference: "000071",
                isRedirect: false,
                linkedTags: [],
                nutriScore: {
                  label: "",
                  value: "",
                },
                outOfStock: false,
                description: {
                  Default: {
                    impression: [],
                    nameDefault: "",
                    salesSupport: [],
                  },
                },
                displayName: {
                  Default: {
                    impression: [],
                    nameDefault: "BOLLYWOOD JUNIOR",
                  },
                },
                suspendSale: [],
                categoryParent: "8346f084-2db1-4349-846d-27a547a79d35",
                stepVisibility: {
                  default: {
                    Emporter: {
                      id: "d99758ef-0049-4513-90fe-ca44bd069aac",
                      visibility: true,
                    },
                    Livraison: {
                      id: "3cb893e8-0f3a-4dcf-aab7-9545e97dfda7",
                      visibility: true,
                    },
                    "Sur place": {
                      id: "8185fa67-f472-4173-a9b8-ec3dc79cd697",
                      visibility: true,
                    },
                    Restaurant: {
                      id: "0f0e6661-8f11-4ed8-af32-55a53e45dfd2",
                      visibility: true,
                    },
                  },
                  isVisible: true,
                  basicCompositionVisibility: true,
                },
                visibilityInfo: {
                  default: {
                    Emporter: {
                      id: "d99758ef-0049-4513-90fe-ca44bd069aac",
                      visibility: true,
                    },
                    Livraison: {
                      id: "3cb893e8-0f3a-4dcf-aab7-9545e97dfda7",
                      visibility: true,
                    },
                    "Sur place": {
                      id: "8185fa67-f472-4173-a9b8-ec3dc79cd697",
                      visibility: true,
                    },
                    Restaurant: {
                      id: "0f0e6661-8f11-4ed8-af32-55a53e45dfd2",
                      visibility: true,
                    },
                  },
                  isVisible: true,
                  basicCompositionVisibility: true,
                },
                active_quantity: false,
                categoryLiaison: [],
                isCommentEnable: false,
                basicComposition: {
                  "3598af43-75a1-41f7-bb6c-50e0dc1a3191": {
                    rank: 2,
                    title: "CREME FRAICHE",
                    quantity: 1,
                    isVisible: true,
                    isObligatory: false,
                  },
                  "53ea41b1-89b5-4945-b8c1-1e089d4766de": {
                    rank: 4,
                    title: "FROMAGE",
                    quantity: 1,
                    isVisible: true,
                    isObligatory: false,
                  },
                  "a2a9eb2f-b443-4c40-9616-4c3981f50e90": {
                    rank: 3,
                    title: "OIGNONS",
                    quantity: 1,
                    isVisible: true,
                    isObligatory: false,
                  },
                  "a4906a78-551e-46d8-9b47-107909e0e90c": {
                    rank: 1,
                    title: "SAUCE CURRY",
                    quantity: 1,
                    isVisible: true,
                    isObligatory: false,
                  },
                  "b6e8c09d-907c-4616-811b-21bcb6edb12f": {
                    rank: 5,
                    title: "POULET EPICE",
                    quantity: 1,
                    isVisible: true,
                    isObligatory: false,
                  },
                  "b6e8c09d-907c-4616-811b-21bcb6edb13f": {
                    rank: 5,
                    title: "POIVRONS",
                    quantity: 1,
                    isVisible: true,
                    isObligatory: false,
                  },
                },
                isOptionChoiceEnable: false,
                isItemDesignationShown: true,
              }
            
          },idCategorie:idCategorie
      }),
    });

  };
  const cat: any = localStorage.getItem("card");
  let card:any = JSON.parse(cat || null);
  return (
    <div>
      
          <div>Ajouter item</div>
        <div>
          <form className="form_main" onSubmit={handleSubmit}>
            <div className="inputContainer">
              <input
                id="image"
                className="inputField"
                type="text"
                onChange={(e) => setImage(e.target.value)}
                placeholder="Image URL"
                required
              />
            </div>
            <div className="inputContainer">
              <label>Title</label>
              <input
                id="Title"
                className="inputField"
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
                required
              />
            </div>
            <div className="inputContainer">
              <label>price</label>
              <input
                id="Price"
                className="inputField"
                type="text"
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Price"
                required
              />
            </div>
            <Button type="submit">Add</Button>
          </form>
        </div>
      </div>
  
  );
}
