    
import React from "react";
import './style.css';
import {Map, CircleMarker, TileLayer} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const API_KEY = process.env.REACT_APP_API_KEY;
const center = [38.0344444, -78.5072222]

export default class Api extends React.Component {
  
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <Map
          style={{ height: "750px", width: "100%" }}
          zoom={16}
          center={center}>
          <TileLayer url="http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {this.props.restaurants.map((restaurant) => {
            return (
              <CircleMarker
                center={[restaurant.geometry.location.lat, restaurant.geometry.location.lng]}
                radius={10}
                color="green"/>
              )})}
        </Map>
      </div>
    );
  }
}

