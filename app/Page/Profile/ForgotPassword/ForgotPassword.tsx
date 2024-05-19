// "use client"
// import React, { useState } from "react";

// const ForgotPassword = () => {
//   const [email, setEmail] = useState("");

//   const handleSubmit = (e: any) => { // Souligner le paramètre e
//     e.preventDefault();
//     // Logique pour envoyer un e-mail de réinitialisation du mot de passe
//     console.log("E-mail envoyé à:", email);
//   };

//   return (
//     <div>
//       <h2>Récupération de mot de passe</h2>
//       <form onSubmit={handleSubmit}>
//         <label>
//           Entrez votre adresse e-mail :
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)} // Souligner le paramètre e
//             required
//           />
//         </label>
//         <button type="submit">Envoyer</button>
//       </form>
//     </div>
//   );
// };

// export default ForgotPassword;
