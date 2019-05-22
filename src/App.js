    
import React from "react";
import axios from "axios";
import './style.css';
import {Map, CircleMarker, TileLayer} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const API_KEY = process.env.REACT_APP_API_KEY;
const center = [38.0344444, -78.5072222]

export default class App extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      restaurants: []
    };
  }

  componentDidMount() {
    let url = "https://cors-anywhere-hclaunch.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=38.033554,-78.507980&radius=1500&type=restaurant&key=" + API_KEY
    axios
      .get(url)
      .then(res => {
        let restaurant_list = res.data.results;
        let open_restaurant_list = [];
        
        for (let i = 0; i < restaurant_list.length; i++) {
          if (restaurant_list[i].opening_hours.open_now !== undefined && restaurant_list[i].opening_hours.open_now) {
            open_restaurant_list.push(restaurant_list[i]);
          }
        }
        
        this.setState({
           restaurants: open_restaurant_list
        })
      })
  }

  render() {
    return (
      <div>
        <link ref="style.css"></link>
        <ul>
          {this.state.restaurants.map(restaurant => (
            <div>
              <li key = {restaurant.id}> 
                  <li type="disc"><b><font size="6" color="#8B4000">{restaurant.name}</font></b>
                    <ul>
                      <li><font size="5" color="#D2691E">Rating: {restaurant.rating} out of 5</font></li>
                      <li><font size="5" color="#D2691E">Price Level: <font color="green"><i>{"$".repeat(restaurant.price_level)}</i></font></font></li>
                      <li><font size="5" color="#D2691E">{restaurant.vicinity.substring(0, restaurant.vicinity.lastIndexOf(", Charlottesville"))}</font></li>
                    </ul>
                  </li>
              </li>
            </div>
          ))}
        </ul>
        <Map
          style={{ height: "750px", width: "100%" }}
          zoom={16}
          center={center}>
          <TileLayer url="http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {this.state.restaurants.map((restaurant) => {
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

