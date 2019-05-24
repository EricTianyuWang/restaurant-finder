    
import React from 'react';
import Searchbar from './searchbar';

export default class App extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      restaurants: []
    };
  }
  
  render() {
    return (
      <div>
        <h1><b><font size="10" color="#8B4000">Restaurants Currently Open</font></b><Searchbar/></h1>
      </div>
    );
  }
}

