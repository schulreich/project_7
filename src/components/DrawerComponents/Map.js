import React from "react";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import restaurantData from "../../restaurantData"


export default function App() {
  const [activeRestaurant, setActiveRestaurant] = React.useState(null)
  return (
    <Map center={[51.434406, 6.762329]} zoom={12}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
    
      {restaurantData.map((item =>
      <Marker
        key={item.id}
        position={[
         item.long,
         item.lat
       ]} 
       onclick={() => {
         setActiveRestaurant(item);
        }}
       />
      ))}

      {activeRestaurant && (
      <Popup
      position={[
        activeRestaurant.long,
        activeRestaurant.lat
      ]} 
      onClose= {() =>{
        setActiveRestaurant(null);
      }}
      >
        <div>
        <h2>{activeRestaurant.restaurantName}</h2>
        <p>{activeRestaurant.address}</p>
        </div>
      </Popup>
      )}
    </Map>
  );
}
