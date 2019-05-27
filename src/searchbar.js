    
import React from "react";
import './style.css';
import Api from './api';


export default class Searchbar extends React.Component {
  
  constructor(props) {
		super(props)
		this.state = {
			searchTerm: "",
			submitted: false,
			searchLocation: "Jack Jouett, VA 22903"
		}
  }

	
	handleChange = (event) => {
		this.setState({searchTerm: event.target.value})
	}
	
	sendSearchTerm = (event) => {
		this.setState({
			searchTerm: event.target.value,
			submitted: true
		})
	}

	revertChange = () => {
		this.setState({
			submitted: false
		})
	}

  render() {
    return (
      <div>
    		<input 
					type="text" 
					onChange={this.handleChange} 
					value={this.state.searchTerm} 
					placeholder="Search by keyword..."/>
				<button 
					onClick={this.sendSearchTerm} 
					value={this.state.searchTerm}>Search
				</button>
				<Api 
					searchTerm={this.state.searchTerm} 
					submitted={this.state.submitted} 
					revertChange={this.revertChange}
					locationToSearch={this.state.searchLocation}
				/>
    	</div>
    );
  }
}
