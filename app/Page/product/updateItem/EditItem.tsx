// "use client";
// import React, { SyntheticEvent, useState, useEffect } from "react";
// import { Button, Modal } from "react-bootstrap";

// type EditItemType = {
//   showModal: boolean;
//   setShowModal: Function;
//   setUpdate: Function;
//   update: boolean;
//   itemId: string;
//   categoryId: string;
// };

// export default function EditItem({
//   showModal,
//   setShowModal,
//   setUpdate,
//   update,
//   itemId,
//   categoryId,
// }: EditItemType) {
//   const [image, setImage] = useState("");
//   const [title, setTitle] = useState("");
//   const [price, setPrice] = useState("");

//   useEffect(() => {
//     const productId = localStorage.getItem("productId");
//     const fetchItem = async () => {
//       try {
//         const response = await fetch(
//           `http://localhost:8000/backend/restaurant/getItem/${productId}/${categoryId}/${itemId}`,
//           {
//             method: "GET",
//             headers: { "Content-Type": "application/json" },
//           }
//         );
//         if (response.ok) {
//           const data = await response.json();
//           setImage(data.details.imageUrl.Default.urlDefault);
//           setTitle(data.details.title);
//           setPrice(data.details.price.priceHT);
//         } else {
//           console.error("Failed to fetch item details");
//         }
//       } catch (error) {
//         console.error("Error fetching item details:", error);
//       }
//     };

//     if (itemId && categoryId) {
//       fetchItem();
//     }
//   }, [itemId, categoryId]);

//   const handleSubmit = async (e: SyntheticEvent) => {
//     e.preventDefault();
//     const productId = localStorage.getItem("productId");
//     await fetch(
//       `http://localhost:8000/backend/restaurant/updateItem/${productId}/${categoryId}/${itemId}`,
//       {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           card: {
//             id: itemId,
//             title: title,
//             price: {
//               priceHT: price,
//             },
//             imageUrl: {
//               Default: {
//                 urlDefault: image,
//               },
//             },
//           },
//         }),
//       }
//     );
//     setUpdate(!update);
//     setShowModal(false);
//   };

//   const handleCloseModal = () => {
//     setShowModal(false);
//     setUpdate(!update);
//   };

//   return (
//     <Modal show={showModal} onHide={handleCloseModal}>
//       <Modal.Header closeButton>
//         <Modal.Title>Modifier item</Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         <form onSubmit={handleSubmit}>
//           <div className="inputContainer">
//             <label>Image URL</label>
//             <input
//               className="inputField"
//               type="text"
//               value={image}
//               onChange={(e) => setImage(e.target.value)}
//               placeholder="Image URL"
//               required
//             />
//           </div>
//           <div className="inputContainer">
//             <label>Titre</label>
//             <input
//               className="inputField"
//               type="text"
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//               placeholder="Title"
//               required
//             />
//           </div>
//           <div className="inputContainer">
//             <label>Prix</label>
//             <input
//               className="inputField"
//               type="text"
//               value={price}
//               onChange={(e) => setPrice(e.target.value)}
//               placeholder="Price"
//               required
//             />
//           </div>
//           <Button type="submit">Modifier</Button>
//         </form>
//       </Modal.Body>
//     </Modal>
//   );
// }
"use client";
import React, { SyntheticEvent, useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";

type EditItemType = {
  showModal: boolean;
  setShowModal: Function;
  setUpdate: Function;
  update: boolean;
  itemId: string;
  categoryId: string;
};

export default function EditItem({
  showModal,
  setShowModal,
  setUpdate,
  update,
  itemId,
  categoryId,
}: EditItemType) {
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    const productId = localStorage.getItem("productId");
    const fetchItem = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/backend/restaurant/getItem/${productId}/${categoryId}/${itemId}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setImage(data.details.imageUrl.Default.urlDefault);
          setTitle(data.details.title);
          setPrice(data.details.price.priceHT);
        } else {
          console.error("Failed to fetch item details");
        }
      } catch (error) {
        console.error("Error fetching item details:", error);
      }
    };

    if (itemId && categoryId) {
      fetchItem();
    }
  }, [itemId, categoryId]);

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    const productId = localStorage.getItem("productId");
    await fetch(
      `http://localhost:8000/backend/restaurant/updateItem/${productId}/${categoryId}/${itemId}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          card: {
            id: itemId,
            title: title,
            price: {
              priceHT: price,
            },
            imageUrl: {
              Default: {
                urlDefault: image,
              },
            },
          },
        }),
      }
    );
    setUpdate(!update);
    setShowModal(false);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setUpdate(!update);
  };

  return (
    <Modal show={showModal} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>Modifier item</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form >
          <div className="inputContainer">
            <label>Image URL</label>
            <input
              className="inputField"
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="Image URL"
              required
            />
          </div>
          <div className="inputContainer">
            <label>Titre</label>
            <input
              className="inputField"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
              required
            />
          </div>
          <div className="inputContainer">
            <label>Prix</label>
            <input
              className="inputField"
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Price"
              required
            />
          </div>
          <Button onClick={handleSubmit}>Modifier</Button>
        </form>
      </Modal.Body>
    </Modal>
  );
}
