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
import { Button, Modal} from "react-bootstrap";
import { v4 } from 'uuid';

type AddItemType = {
  showModal: boolean,
  setShowModal: Function,
  setUpdate: Function,
  update: boolean
}
export default function AddItem({showModal, setShowModal, setUpdate, update }:AddItemType) {
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
        let id=v4()
    const categorieID = localStorage.getItem("categorieID");
    const productId = localStorage.getItem("productId");
    await fetch(`http://localhost:8000/backend/restaurant/addItem/${productId}/${categorieID}`, {
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
              }
            },
      }),
    
    });
    setUpdate(!update);
    setShowModal(false);
  };
  
  const handleCloseModal = () => {
    setShowModal(false);
    setUpdate(!update); // Trigger update to refresh categories
  };
  // const cat: any = localStorage.getItem("card");
  // let card:any = JSON.parse(cat || null);
  return (
    <Modal show={showModal} onHide={handleCloseModal}>

      <Modal.Header closeButton>
        <Modal.Title>Ajouter item</Modal.Title>
      </Modal.Header>
      <Modal.Body>
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
     </Modal.Body>
   </Modal>
  
  );
}
