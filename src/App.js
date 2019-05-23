    
import React from 'react';
import Api from './api';
import List from './list';
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
        <h1>Restaurants Currently Open</h1>
        <Searchbar/>
      </div>
    );
  }
}

