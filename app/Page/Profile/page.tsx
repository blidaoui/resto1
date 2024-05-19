"use client"
import React, { useState, useEffect } from "react";
import { LuUserCircle2 } from "react-icons/lu";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { MdOutlineMarkEmailRead, MdSaveAs } from "react-icons/md";
import { useForm } from "react-hook-form";
import InputProfile from "./inputprofile";
import Address from "./Address";
import Cartes from "./Cartes";
import "./profile.css";
import { CiMobile3 } from "react-icons/ci";
import Container from "@/app/components/Container";

interface UserData {
  user_id: number;
  nom: string;
  prenom: string;
  tele: string;
  email: string;
}

const Page = () => {
    const [dataUser, setDataUser] = useState<UserData>({ user_id: 1, nom: "", prenom: "", tele: "", email: "" });

  const { register, handleSubmit, formState: { errors } } = useForm();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const userId=localStorage.getItem("userId")
      const response = await fetch(`http://localhost:8000/backend/user/${userId}`, {
        method: "GET",
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const jsonData = await response.json();
      setDataUser(jsonData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const updateUser = async (formData: UserData) => {
    try {
      if (!dataUser || !dataUser.user_id) {
        console.error("User ID is not available.");
        return;
      }
      const userId=localStorage.getItem("userId")

      const response = await fetch(`http://localhost:8000/backend/user/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      
      if (!response.ok) {
        throw new Error("Failed to update data");
      }
  
      console.log("Updated");
      getData(); // Re-fetch updated data after successful update
    } catch (error) {
      console.error("Error updating:", error);
    }
  };

  const handleUpdate = (formData:any) => {
    updateUser(formData);
  };
  return (
    <div>
    <Container>
      <div className="flex justify-between">
        <div className="flex items-center gap-2 p-2">
          <LuUserCircle2 size={30} />
          <p className="text-xl">Bonjour {dataUser?.nom} {dataUser?.prenom}</p>
        </div>
      </div>
      <div className="grid grid-cols-2">
        <div className="col-span-1 w-[130%]">
          <div className="border-[1.2px] border-slate-200 bg-white shadow-md rounded-2xl m-4">
            <div className="flex justify-between">
              <div className="flex p-2 gap-1">
                <IoIosInformationCircleOutline size={25} />
                <p className="">Informations générales</p>
              </div>
              <div className="p-2">
                <MdSaveAs onClick={handleSubmit(handleUpdate)}  size={30} className="bg-white text-gray-600 rounded-md" />
              </div>
            </div>
            <div className="p-2 grid md:grid-cols-2 gap-2">
              <InputProfile
                id="nom"
                required
                register={register}
                errors={errors}
                type="text"
                placeholder="Saisissez votre nom"
                label="Nom"
                value={dataUser?.nom ?? ''}
                onChange={(e) => setDataUser({ ...dataUser, nom: e.target.value })}
              /> <InputProfile
              id="prenom"
              required
              register={register}
              errors={errors}
              type="text"
              placeholder="Saisissez votre prénom"
              label="Prenom"
              Icon={LuUserCircle2}
              value={dataUser?.prenom ?? ''}
              onChange={(e) => setDataUser({ ...dataUser, prenom: e.target.value })}
              />
              <InputProfile
              id="tele"
              required
              register={register}
              errors={errors}
              type="text"
              placeholder="06 12 34 56 78"
              label="Télephone"
              Icon={CiMobile3}
              value={dataUser?.tele ?? ''}
              onChange={(e) => setDataUser({ ...dataUser, tele: e.target.value })}
              
              />
              <InputProfile
              id="email"
              required
              register={register}
              errors={errors}
              type="email"
              placeholder="Saisissez votre e-mail"
              label="E-mail"
              Icon={MdOutlineMarkEmailRead}
              value={dataUser?.email ?? ''}
              onChange={(e) => setDataUser({ ...dataUser, email: e.target.value })}
             
              />
          </div>
          </div>
          <Address />
          <Cartes />
          
      </div>
      <div className="col-span-1 w-[70%] justify-self-end">
          <div className=" relative justify-content border-[1.2px] border-slate-400 bg-gray-700  text-white shadow-md  rounded-xl ml-4 mt-4 mr-4 mt-1  ">
          <div className="flex p-2 justify-between ">
              <div className="flex gap-1">
              <p className="">Total Commande</p>
              </div>
              <div>
              </div>
          </div>
          </div>
          <div className=" relative justify-content border-[1.2px] border-slate-400 bg-white  shadow-md  rounded-xl ml-4 mr-4 mt-1">
          <div className="flex p-2 justify-between ">
              <div className="flex gap-1">
              <p className="">Cart de fidélité</p>
              </div>
              <div>cc</div>
          </div>
          </div>
          <div className=" relative justify-content border-[1.2px] border-slate-400 bg-white  shadow-md  rounded-xl ml-4 mr-4 mt-1">
          <div className="flex p-2 justify-between ">
              <div className="flex gap-1">
              <p className="">Code Promo</p>
              </div>
              <div>ccc</div>
          </div>
          </div>
          <div className=" relative justify-content border-[1.2px] border-slate-400 bg-white  shadow-md  rounded-xl ml-4 mr-4 mt-1">
          <div className="flex p-2 justify-between ">
              <div className="flex gap-1">
              <p className="">Reste a payer</p>
              </div>
              <div>
              </div>
          </div>
          </div>
          <div className=" relative justify-content border-[1.2px] border-slate-400 bg-gray-700  text-white shadow-md  rounded-t-xl ml-4 mr-4 mt-4 ">
          <div className="grid flex-row p-2 justify-between ">
              <div className="flex gap-1 ">
              <p className="">Panier</p>
              </div>
          </div>
          </div>
          <div className=" relative justify-content border-[1.2px] border-slate-400 bg-white  shadow-md  rounded-b-xl ml-4 mr-4 mb-4">
          <div className="grid flex-row p-2 justify-between ">
           
          </div>
          </div>
      </div>
      </div>
  </Container>
  </div>
);
};

export default Page;
