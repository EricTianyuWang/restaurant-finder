    
import React from "react";
import './style.css';
import Api from './api';

let submited = false

export default class Searchbar extends React.Component {
  
  constructor(props) {
		super(props)
		this.state = {
			searchTerm: ""
		}
  }

	
	handleChange = (event) => {
		this.setState({searchTerm: event.target.value})
	}
	
	sendSearchTerm = (event) => {
		this.setState({searchTerm: event.target.value})
		submited = true
	}

  render() {
    return (
      <div>	
    		<input 
					type="text" 
					onChange={this.handleChange} 
					value={this.state.searchTerm} 
					placeholder="Search for categories.."/>
				<button 
					onClick={this.sendSearchTerm} 
					value={this.state.searchTerm}>Search
				</button>
				<Api searchTerm = {this.state.searchTerm}/>
    	</div>
    );
  }
}
