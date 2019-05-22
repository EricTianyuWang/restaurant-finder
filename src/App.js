    
import React, { Component } from "react";
import axios from "axios";
const API_KEY = process.env.REACT_APP_API_KEY;
class App extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      restaurants: []
    };
  }

  componentDidMount() {
    let url = "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=38.033554,-78.507980&radius=1500&type=restaurant&key=" + API_KEY
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
        <body bgcolor="antiquewhite">
        <ul>
          {this.state.restaurants.map(restaurant => (
            <li key = {restaurant.id}> 
                  <li type="disc"><b><font size="6" color="#8B4000">{restaurant.name}</font></b><ul>
                  <li><font size="5" color="#D2691E">Rating: {restaurant.rating} out of 5</font></li>
                  <li><font size="5" color="#D2691E">Price Level: <font color="green"><i>{"$".repeat(restaurant.price_level)}</i></font></font></li>
                  <li><font size="5" color="#D2691E">{restaurant.vicinity.substring(0, restaurant.vicinity.lastIndexOf(", Charlottesville"))}</font></li>
                </ul>
              </li>
            </li>
          ))}
        </ul>
        </body>
      </div>
    );
  }
}

export default App
