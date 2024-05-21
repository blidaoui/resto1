"use client";

import React from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { useFormik } from 'formik';
import * as Yup from 'yup';

type UpdateRestoType = {
  showModalUpdate: boolean;
  setShowModalUpdate: (show: boolean) => void;
  setUpdate: (update: boolean) => void;
  update: boolean;
  selectedResto: any;
};

const restaurantSchema = Yup.object().shape({
  image: Yup.string().required('Image is required'),
  Company: Yup.string().required('Company is required'),
  town: Yup.string().required('Town is required'),
  Nature: Yup.string().required('Nature is required'),
  Country: Yup.string().required('Country is required'),
  Address: Yup.string().required('Address is required'),
  latitude: Yup.number().required('Latitude is required'),
  longitude: Yup.number().required('Longitude is required'),
  closingTime: Yup.string().required('Closing time is required'),
  openingTime: Yup.string().required('Opening time is required'),
  PostalCode: Yup.string().required('Postal code is required'),
  
});

const ModifierRestaurant: React.FC<UpdateRestoType> = ({
  showModalUpdate,
  setShowModalUpdate,
  setUpdate,
  update,
  selectedResto,
}) => {
  const formik = useFormik({
    initialValues: {
      image: selectedResto.resto.image,
      Company: selectedResto.resto.Company,
      town: selectedResto.resto.town,
      Nature: selectedResto.resto.Nature,
      Country: selectedResto.resto.Country,
      Address: selectedResto.resto.Address,
      latitude: selectedResto.resto.latitude,
      longitude: selectedResto.resto.longitude,
      closingTime: selectedResto.resto.closingTime,
      openingTime: selectedResto.resto.openingTime,
      PostalCode: selectedResto.resto.PostalCode,
     
    },
    validationSchema: restaurantSchema,
    onSubmit: async (values) => {
      const productId = localStorage.getItem("productId")
        ? parseInt(localStorage.getItem("productId") as string, 10)
        : null;

      await fetch(`http://localhost:8000/backend/restaurant/${productId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          resto: {
            ...values,
            shopid: selectedResto.resto.shopid,
            Responsible: "",
          },
        }),
      });

      setUpdate(!update);
      setShowModalUpdate(false);
    },
  });

  return (
    <Modal show={showModalUpdate} onHide={() => setShowModalUpdate(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Modifier Restaurant</Modal.Title>
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
                {formik.errors[key as keyof typeof formik.values] as string}
              </Form.Control.Feedback>
            </Form.Group>
          ))}
          <Button variant="primary" type="submit">
            Modifier
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ModifierRestaurant;
