    
import React from "react";
import './style.css';

export default class Api extends React.Component {
  
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <link ref="style.css"></link>
        <ul>
          {this.props.restaurants.map(restaurant => (
            <div>
              <li key = {restaurant.id}> 
                  <li><b><font size="6" color="#8B4000">{restaurant.name}</font></b>
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
      </div>
    );
  }
}

