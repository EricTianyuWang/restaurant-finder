    
import React from "react";
import axios from "axios";
import List from './list';
import MyMap from './map';

const API_KEY = process.env.REACT_APP_API_KEY;

export default class Api extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      restaurants: []
    };
  }

  myUpdate() {
    let url = "https://cors-anywhere-hclaunch.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?"
    + "location=38.033554,-78.507980"
    + "&radius=1500&type=restaurant&key=" + API_KEY
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

