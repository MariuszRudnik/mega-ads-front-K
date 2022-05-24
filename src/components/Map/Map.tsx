import React, {useContext, useEffect} from "react";
import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";
import '../../utils/fix-map-icon'
import 'leaflet/dist/leaflet.css';
import './map.css';
import {SearchContext} from "../../contexts/search.context";


export const Map = ()=>{
    const {search} = useContext(SearchContext);

    useEffect(()=>{
        console.log('sss')
    },[search])
    return(
        <div className="map">
                <h1>Serch for {search}</h1>
            <MapContainer center={[50.2657152, 18.9945008]} zoom={15}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={[50.2657152, 18.9945008]}>
                    <Popup>
                        <h2>It.Focus</h2>
                        <p>Firma co programuje</p>
                    </Popup>
                </Marker>
            </MapContainer>
        </div>
    )
}