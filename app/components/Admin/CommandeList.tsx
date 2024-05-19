import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { MdAddTask } from "react-icons/md";
import { RiChatDeleteLine } from "react-icons/ri";

interface Commande {
  id: number;
  etat: string;
  prix: string;
  id_user: number;
  createdAt: string;
  ModeRetrait: { Mode: string; time: string };
  cartItem: { [key: string]: { title: string } };
  etat_Commande: string; // Updated property name
}

const CommandeList: React.FC = () => {
  const [commande, setCommande] = useState<Commande[]>([]);
  const [Update,setUpdate] = useState<boolean>(false);


  const fetchCommande = async () => {
    try {
      const response = await fetch("http://localhost:8000/backend/panier", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) {
        const data = await response.json();
        setCommande(data); // Set the users state with the fetched data
      } else {
        console.error("Failed to fetch Commande");
      }
    } catch (error) {
      console.error("Error fetching Commande:", error);
    }
  };

  const changeEtat = async (id: number, etat_commande: string) => {
    try {
      const response = await fetch(`http://localhost:8000/backend/panier/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ etat_Commande: etat_commande }), // Include etat_Commande in the request body
      });

      if (response.ok) {
        // Update the local state to reflect the changes
        setCommande(prevState =>
          prevState.map(item =>
            item.id === id ? { ...item, etat_Commande: etat_commande } : item
          )
        );
      } else {
        console.error("Failed to update status:", response.status, response.statusText);
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  useEffect(() => {
    fetchCommande();
  }, [[Update]]); // Fetch data only once when the component mounts

  return (
    <div>
      <h2>Liste des commandes</h2>

      <table className="table">
        {/* Table header */}
        <tbody>
          {commande.map((commandeItem: Commande) => (
            <tr key={commandeItem.id}>
              <td>
                {/* Convertir l'objet cartItem en tableau d'objets et afficher les titres */}
                {Object.values(commandeItem.cartItem).map((item, index) => (
                  <span key={index}>{item.title}</span>
                ))}
              </td>
              <td>{commandeItem.etat_Commande}</td>
              <td>{commandeItem.prix}</td>
              <td>{commandeItem.id_user}</td>
              <td>{commandeItem.ModeRetrait.Mode}</td>
              <td> {commandeItem.ModeRetrait.time}</td>
              <td>{commandeItem.createdAt}</td>
              <td>
                <Button onClick={() => changeEtat(commandeItem.id, "accepté")}
                    setUpdate={setUpdate}>
                  <MdAddTask />
                </Button>
              </td>
              <td>
                
                <Button onClick={() => changeEtat(commandeItem.id, "refusé")}
                    setUpdate={setUpdate}>
                  <RiChatDeleteLine />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CommandeList;
