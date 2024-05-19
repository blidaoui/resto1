import React from "react";

const Registration = () => {
    const handleConditionsGenerales = () => { };

    const handleConditionsVente = () => { };

    const handlePolitiquesConfidentialite = () => { };
    const handleMentionLegales = () => { };
    return (
        <div>
            <form className="form_main" action="">
                <p className="heading">Registration</p>
                <div className="inputContainer">
                    <input
                        placeholder="Saisissez votre nom"
                        id="nom"
                        className="inputField"
                        type="text"
                    />
                </div>

                <div className="inputContainer">
                    <input
                        placeholder="Saisissez votre prénom"
                        id="prénom"
                        className="inputField"
                        type="text"
                    />
                </div>

                <div className="inputContainer">
                    <input
                        placeholder="Téléphone"
                        id="Téléphone"
                        className="inputField"
                        type="integer"
                    />
                </div>
                <div className="inputContainer">
                    <input
                        placeholder="saisissez votre e-mail"
                        id="email"
                        className="inputField"
                        type="email"
                    />
                </div>
                <div className="inputContainer">
                    <input
                        placeholder="saisissez votre mot de passe"
                        id="motdepasse"
                        className="inputField"
                        type="password"
                    />
                </div>
                <div className="inputContainer">
                    <input
                        placeholder="confirmez votre mot de passe"
                        id="motdepasse"
                        className="inputField"
                        type="password"
                    />
                </div>
                <p className="text-xl mb-5">
                    1 Minuscule & 1 Majuscule
                    <br /> 1 chiffre (0-9)
                    <br /> 8 caractères
                </p>
                <div className="inputContainer">
                    <label className="">Profile Picture</label>
                </div>

                <div>
                    <input id="button" type="file" />
                </div>

                <div>
                    <button id="button" type="button">
                        Create Account
                    </button>
                </div>

                <div className="d-flex flex-column bd-highlight mb-3 taille_text">
                    <div className="p-2 bd-highlight">
                        En continuant, vous acceptez nos :
                    </div>

                    <div className="p-2 bd-highlight">
                        <div
                            onClick={handleConditionsGenerales}
                            style={{
                                color: "#000",
                                cursor: "pointer",
                                textDecoration: "underline",
                            }}
                        >
                            Conditions Générales d'Utilisation
                        </div>
                    </div>
                    <div className="p-2 bd-highlight">
                        <div
                            onClick={handleConditionsVente}
                            style={{
                                color: "#000",
                                cursor: "pointer",
                                textDecoration: "underline",
                            }}
                        >
                            Conditions Générales de Vente
                        </div>
                    </div>
                    <div className="p-2 bd-highlight">
                        <div
                            onClick={handlePolitiquesConfidentialite}
                            style={{
                                color: "#000",
                                cursor: "pointer",
                                textDecoration: "underline",
                            }}
                        >
                            Politiques de Confidentialité
                        </div>
                    </div>
                </div>
            </form>
            <div id="body_footer" className="modal-footer" style={{ borderTop: 0 }}>
                <div
                    className="w-100 d-flex justify-content-between align-items-center"
                    style={{
                        color: "var(--unnamed-color-aeaeae)",
                        textAlign: "center",
                        textDecoration: "underline",
                        letterSpacing: "0px",
                        cursor: "pointer",
                    }}
                    onClick={handleMentionLegales}
                >
                    <span className=""></span>
                    <span className="mx-4">Mention légales</span>
                    <span className=""></span>
                </div>
            </div>
        </div>
    );
};

export default Registration;