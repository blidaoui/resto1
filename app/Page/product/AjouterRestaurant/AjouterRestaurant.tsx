import React from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { useFormik } from 'formik';
import * as Yup from 'yup';

interface AjouterRestaurantProps {
  showModal: boolean;
  setShowModal: (show: boolean) => void;
  setUpdate: (update: boolean) => void;
  update: boolean;
}

const restaurantSchema = Yup.object().shape({
  image: Yup.string().required('Image is required'),
  town: Yup.string().required('Town is required'),
  company: Yup.string().required('Company name is required'),
  country: Yup.string().required('Country is required'),
  address: Yup.string().required('Address is required'),
  latitude: Yup.number().required('Latitude is required'),
  longitude: Yup.number().required('Longitude is required'),
  openingTime: Yup.string().required('Opening time is required'),
  closingTime: Yup.string().required('Closing time is required'),
  postalCode: Yup.string().required('Postal code is required'),
  nature: Yup.string().required('Nature is required')
});

const AjouterRestaurant: React.FC<AjouterRestaurantProps> = ({ showModal, setShowModal, setUpdate, update }) => {
  const formik = useFormik({
    initialValues: {
      image: '',
      town: '',
      company: '',
      country: '',
      address: '',
      latitude: '',
      longitude: '',
      openingTime: '',
      closingTime: '',
      postalCode: '',
      nature: ''
    },
    validationSchema: restaurantSchema,
    onSubmit: async (values) => {
      setShowModal(false);

      let shopId: any = localStorage.getItem("shopLength");

      await fetch("http://localhost:8000/backend/restaurant/addresto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          resto: {
            ...values,
            shopid: Number(shopId),
            Responsible: "",
          },
          card: {
            etat: "En attente",
            tags: {},
            color: "#FFFFF",
            items: {},
            operator: "Administrateur",
            workflow: {},
            shoptitle: "boutique 01 catalogue",
            categories: {},
            allergenGroups: {
              "7efb7e13-d542-4c20-8e36-535129686dcb": {
                icon: "",
                title: "GLUTIN",
                allergens: [
                  "fe16508e-b58a-4372-b551-0b880d053593",
                  "eca2695f-2970-4d92-a4b1-b5d3f99d4190",
                  "867445e6-7ed8-46de-92ba-aeb4defe9bf6",
                  "7f09729d-c128-4989-8033-a65619561953",
                  "b130baf1-f098-474d-a529-8771b6db311e",
                  "dc110013-6f2e-42e7-8747-165847ab0545",
                ],
              },
              "f56bb3e9-96d9-4c76-ac36-a4f61f9028c5": {
                icon: "",
                title: "FRUITS A COQUES",
                allergens: [
                  "caf18793-6df7-4110-8720-25b4cf2bdead",
                  "367e335f-6f35-4864-b0bf-e20c39be9a79",
                  "62c7fc23-12cf-4a70-89a8-69a7a638986d",
                  "d39bc94b-ae03-43e1-a52e-88b04c3a5744",
                  "90f99eac-d484-4a38-aaf9-17b690bf6b94",
                  "0b0800bb-3410-4018-b574-3d7bf0325bed",
                  "b450efc7-0144-4a4c-8d07-4c012daa9457",
                  "c3145fe7-aede-4a69-8429-155c00ae1446",
                ],
              },
            },
            dateModification: "Le 28/03/2024 à 10:57",
            iuudCardReference: "ab82c200-0f23-6bef-16f9-4b856d6dfcb4",
            isDesignationUnique: false,
            isReferenceAutomatic: false,
          },
        }),
      });
      setUpdate(!update);
      shopId = Number(shopId) + 1;
      localStorage.setItem("shopLength", shopId);
    },
  });

  return (
    <Modal show={showModal} onHide={() => setShowModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title className="text-center">Ajouter restaurant</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ maxHeight: '80vh', overflowY: 'auto' }}>
        <Form onSubmit={formik.handleSubmit}>
          {Object.keys(formik.values).map((key) => (
            <Form.Group className="mb-3" controlId={key} key={key}>
              <Form.Label>{key.charAt(0).toUpperCase() + key.slice(1)}</Form.Label>
              <Form.Control
                type={key.includes("Time") ? "time" : "text"}
                placeholder={`Enter ${key}`}
                onChange={formik.handleChange}
                value={formik.values[key as keyof typeof formik.values]}
                isInvalid={!!formik.errors[key as keyof typeof formik.values]}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors[key as keyof typeof formik.values]}
              </Form.Control.Feedback>
            </Form.Group>
          ))}
          <Button variant="primary" type="submit">
            Ajouter
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AjouterRestaurant;
