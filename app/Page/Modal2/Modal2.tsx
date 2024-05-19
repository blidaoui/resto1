import React, { useState } from "react";
import "./Modal2.css";
import { useRouter } from "next/navigation";
import { useSnapshot } from "valtio";
import store from "@/app/components/store";


interface Modal2Props {
    showModal: boolean;
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
    // Autres props si nécessaire
}

const Modal2: React.FC<Modal2Props> = ({ showModal, setShowModal }: Modal2Props) => {
    const router = useRouter();
    const { selectedCategorie, selectedImage } = useSnapshot(store);
    console.log({ selectedImage });
    const [baseChecked, setBaseChecked] = useState<boolean>(false);
    const [supplementChecked, setSupplementChecked] = useState<boolean>(false);
    const [modalOpen, setModalOpen] = useState<boolean>(false);

    const closeModal = () => {
        setModalOpen(false);
    };

    const handleBaseChange = () => {
        setBaseChecked(!baseChecked);
    };

    const handleSupplementChange = () => {
        setSupplementChecked(!supplementChecked);
    };

    const handleOrder = () => {
        // Traitement de la commande de pizza ici
        alert("Pizza commandée avec succès !");
        closeModal();
    };

    const handleCloseClick = () => {
        setShowModal(false);
    };

    return (
        <>
            <div className="container">
                <div className="modal-container">
                    <div className="modal-header">
                        <h5 className="modal-title">Modal title</h5>
                    </div>
                    <div className="modal__clz">
                        <div className="row">
                            <div className="row">
                                <h2 style={{ width: "80%" }}>Modes de retrait</h2>
                                <span
                                    onClick={handleCloseClick}
                                    className="close-button"
                                    style={{ width: "10%" }}
                                >
                                    ×
                                </span>
                            </div>
                            <div className="modal-body">
                                <img className="card-img-top" src={selectedImage} alt="Card image cap" />

                                {/* <Image src={selectedImage} alt="Pizza" width={300} height={200} /> */}
                                <h2>Composition de la pizza :</h2>
                                <input
                                    type="checkbox"
                                    id="base"
                                    name="composition"
                                    value="base"
                                    checked={baseChecked}
                                    onChange={handleBaseChange}
                                />
                                <label htmlFor="base">Composition de base</label>
                                <br />
                                <input
                                    type="checkbox"
                                    id="supplement"
                                    name="composition"
                                    value="supplement"
                                    checked={supplementChecked}
                                    onChange={handleSupplementChange}
                                />
                                <label htmlFor="supplement">Pizza suppléments</label>
                                <br />
                                <button onClick={handleOrder}>ajouter dans panier </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Modal2; 