    
import React from "react";
import axios from "axios";
import List from './list';
import MyMap from './map';

const API_KEY = process.env.REACT_APP_API_KEY;
let lat;
let lng;

export default class Api extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      restaurants: [],
      lat: 0,
      lng: 0
    };
  }

  myUpdate() {
    //geocoding a city to get lat and long
    axios
      .get("https://cors-anywhere-hclaunch.herokuapp.com/https://maps.googleapis.com/maps/api/geocode/json?address=" + this.props.locationToSearch
        +"&sensor=false&key=" + API_KEY)
      .then(res => {
        lat = res.data.results[0].geometry.location.lat
        lng = res.data.results[0].geometry.location.lng
        console.log(lat+","+lng)
        let url = "https://cors-anywhere-hclaunch.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?"
          + "location="+lat+","+lng
          + "&radius=2000&type=restaurant&key=" + API_KEY

      console.log(url)
      axios
      .get(url)
      .then(res => {
        let restaurant_list = res.data.results;
        let open_restaurant_list = [];
        let searchTerm = this.props.searchTerm.toLowerCase();

        for (let i = 0; i < restaurant_list.length; i++) {
          if (restaurant_list[i].opening_hours.open_now !== undefined 
            && restaurant_list[i].opening_hours.open_now
            && this.fitsCriteria(JSON.stringify(restaurant_list[i]), searchTerm)) {
            open_restaurant_list.push(restaurant_list[i]);
          }
        }
        
        this.setState({
           restaurants: open_restaurant_list
        })
      })
      })
  }

  fitsCriteria(category, key) {
    return category.toLowerCase().includes(key.toLowerCase());
  }

  componentDidMount() {
    this.myUpdate();
  }

  render() {
    if (this.props.submitted) {
      this.myUpdate();
      this.props.revertChange();
    }
    return (
      <div>
        <List restaurants = {this.state.restaurants}/>
        <MyMap restaurants = {this.state.restaurants}/>
      </div>
    );
  }
}

