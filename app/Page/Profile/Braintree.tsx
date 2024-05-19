import React, { useState, useEffect } from "react";
import DropIn from "braintree-web-drop-in-react";
import { Button } from "react-bootstrap";

const Subscriptions = () => {
  const [purchaseComplete, setPurchaseComplete] = useState(false);
  let instance: any;
  const buy = async () => {
    // const userId=localStorage.getItem("userId")
    const panier= localStorage.getItem("panier")
    try {
      const { nonce } = await instance.requestPaymentMethod();
      const res = await fetch("http://localhost:8000/backend/user/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ paymentMethodNonce: nonce, user_id: '1234' }),
      });
      const result = await res.json();
      if (result.result.result === "success") {
        try {
          const response = await fetch(`http://localhost:8000/backend/panier/${panier}`, {
            method: "PUT",
          });
          if (!response.ok) {
            throw new Error("Failed to update shopping cart");
          }
          setPurchaseComplete(true);
        } catch (error) {
          console.error("Error updating shopping cart:", error);
        }
      } else {
      }
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  };

  return (
    <div>
      {purchaseComplete ? (
        <div>
          <h1>Completed.</h1>
        </div>
      ) : (
        <div>
          <DropIn
            options={{ authorization: "sandbox_jydk65fg_29b46ndbxsvgxwmg" }}
            onInstance={(inst) => (instance = inst)}
          />
          <Button type="submit" onClick={buy} >confirme</Button>
        </div>
      )}
    </div>
  );
};

export default Subscriptions;
