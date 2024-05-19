"use client";
import {
  GoogleMap,
  InfoWindowF,
  LoadScript,
  MarkerF,
} from "@react-google-maps/api";
import Container from "../components/Container";
import useLocation from "@/app/hooks/useLocation";
import { FaMapMarkerAlt } from "react-icons/fa";
import L from "leaflet";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";


type place =
  | {
      town: string;
      image: string;
      Nature: string;
      shopid: number;
      Address: string;
      Company: string;
      Country: string;
      PostalCode: string;
      latitude: number;
      longitude: number;
      Responsible: string;
      etat: string;
    }
  | undefined;
type CustomSize = {
  width: number;
  height: number;
  equals: (other: CustomSize) => boolean;
};
const Map = () => {
  const [resto, setResto] = useState([]);

  useEffect(() => {
    const shop1: any = localStorage.getItem("shop");
    const shop: any = JSON.parse(shop1);
    setResto(shop);
  }, []);

  const ContainerStyle = {
    width: "100%",
    height: "70vh",
  };
  const cordinate = { lat: 44.62072, lng: 4.39088 };
  const { userLocation, setUserlocation } = useLocation();
  console.log("locationx", userLocation);

  const customPinView: any = new L.Icon({
    icon: FaMapMarkerAlt, // Specify the path to your icon image
    iconSize: [50, 50],
    // Set the size of the icon
  });

  const pixelOffset: CustomSize = {
    width: 0,
    height: 0,
    equals: function (other: CustomSize): boolean {
      return this.width === other.width && this.height === other.height;
    },
  };

  const [selectedPlace, setSelectedPlace] = useState<any>();
  const router = useRouter();

  console.log({ resto });

  return (
    <Container>
      <div className="m-2">
        <LoadScript googleMapsApiKey="AIzaSyAAdgbqVD_uhONwOx2Crn9x6XIaTD_ernI">
          <GoogleMap
            mapContainerStyle={ContainerStyle}
            center={cordinate}
            zoom={4}
          >
            <MarkerF
              key="myLocation"
              icon={customPinView}
              position={userLocation}
            />

            {resto.length > 0 &&
              resto.map((shop: any) => (
                <MarkerF
                  key={shop.id}
                  onClick={() => {
                    shop.resto === selectedPlace
                      ? setSelectedPlace(undefined)
                      : setSelectedPlace(shop.resto);
                  }}
                  icon={customPinView}
                  position={{
                    lat: shop.resto.latitude,
                    lng: shop.resto.longitude,
                  }}
                />
              ))}

            {selectedPlace && (
              <InfoWindowF
                position={{
                  lat: selectedPlace.latitude,
                  lng: selectedPlace.longitude,
                }}
                zIndex={1}
                options={{
                  pixelOffset: pixelOffset,
                }}
                onCloseClick={() => setSelectedPlace(undefined)}
              >
                <div>
                  <div className="aspect-square overflow-hidden relative w-full rounded-md h-[200px]">
                    <img
                      src={selectedPlace.image}
                      alt=""
                      style={{ width: "100%", height: "auto" }}
                      onClick={() => {
                        router.push(
                          `/components/Boutiques/${selectedPlace.id}`
                        );
                      }}
                    />
                  </div>

                  <h3>{selectedPlace.Company}</h3>
                  <div className=" text-[15px] flex gap-1 ">
                    <div>{selectedPlace.Address},</div>
                    <div>{selectedPlace.PostalCode}</div>
                    <div>{selectedPlace.town}</div>
                  </div>
                </div>
              </InfoWindowF>
            )}
          </GoogleMap>
        </LoadScript>
      </div>
    </Container>
  );
};

export default Map;
