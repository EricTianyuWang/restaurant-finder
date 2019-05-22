import React, { Component } from "react";
import {Map, CircleMarker, TileLayer} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './style.css';



export default class MyMap extends React.Component {
    /*
    componentDidMount() {
    // create map
    this.map = L.map('map', {
      center: [0, 0],
      zoom: 16,
    });
    L.tileLayer('https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}{r}.png', {
        attribution: '<a href="https://wikimediafoundation.org/wiki/Maps_Terms_of_Use">Wikimedia</a>',
        minZoom: 5,
        maxZoom: 19
    }).addTo(this.map);
  }
  */
  render() {
    return <Map center={[0,0]} zoom={[3]}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        </Map>
  }
}
