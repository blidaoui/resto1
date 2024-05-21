"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { IoRestaurant } from "react-icons/io5";
import { HiMiniMapPin } from "react-icons/hi2";

import Icons from "@/app/components/Icons/Icons";
import { setId } from "@/app/components/store";

 
function CardBoutique() {
  const router = useRouter();
  const [shopList, setShopList] = React.useState<any>([]);
  const [isAdmin, setIsAdmin] = React.useState(false);

  const getShopList = async () => {
    let admin: any = localStorage.getItem("admin");
    admin = JSON.parse(admin || false);
    setIsAdmin(admin);
    try {
      const response = await fetch(`http://localhost:8000/backend/restaurant`, {
        method: "GET",
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const jsonData = await response.json();
      console.log({ jsonData });
      setShopList(jsonData);
      localStorage.setItem("shop", JSON.stringify(jsonData));
      localStorage.setItem("shopLength", jsonData.length);
    } catch (e) {
      console.error("Login error", e);
    }
  };

  const navigateToOtherPage = (id: number) => {
    setId(id);
    localStorage.setItem("id", id.toString());
    var jsonString = JSON.stringify(shopList[id]?.card);

    var jsonData = {};
    for (const key of shopList) {
      if (key.resto.shopid === id) {
        jsonData = {
          workflow: key?.card.workflow,
          categories: key?.card.categories,
          items: key?.card.items,
          id: key?.id,
        };
      }
    }

    var jsonString = JSON.stringify(jsonData);
    localStorage.setItem("card", jsonString);

    router.push("/components/Boutiques");
  };

  React.useEffect(() => {
    getShopList();
  }, []);
  return (
    <section className="news_section">
      <div className="container">
        <div className="heading_container heading_center">
          <h2>
            {" "}
            <IoRestaurant /> Bienvenue au Pizza Time <IoRestaurant />
          </h2>
        </div>
        <div className="row">
          {Object.values(shopList).map((item: any, id: number) => (
            <div
              className="col-md-4 my-3"
              key={id}
              onClick={() => {
                localStorage.setItem("resto", JSON.stringify(item?.resto));
                localStorage.setItem(
                  "idResto",
                  JSON.stringify(item?.resto.shopid)
                );
                localStorage.setItem(
                  "latitude",
                  JSON.stringify(item?.resto.latitude)
                );
                localStorage.setItem(
                  "longitude",
                  JSON.stringify(item?.resto.longitude)
                );
              }}
            >
              <div
                className="box"
                onClick={() =>{localStorage.setItem("idOfShop",item.id); navigateToOtherPage(item?.resto.shopid)}}
              >
                <div
                  className="img-box"
                  style={{
                    cursor: "pointer",
                  }}
                >
                  <img src={item?.resto.image} className="box-img" alt="" />
                </div>
                <div className="detail-box">
                  <h4> {item?.resto.Company}</h4>
                  <p>
                    {" "}
                    <HiMiniMapPin />
                    {item?.resto.Address}, {item?.resto.PostalCode}{" "}
                    {item?.resto.town}
                  </p>
                </div>
                <div>
                  <Icons />
                </div>
                <br />
              </div>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}

export default CardBoutique;
