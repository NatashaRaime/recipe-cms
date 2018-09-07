import React, {Component, PureComponent} from "react";
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Recipe from './Recipe.js';

class Create extends React.Component {

  handleClick = (e) => {
    e.preventDefault();
    console.log('The link was clicked.');
  };

  constructor(props) {
      super(props); 
      this.handleInputChange = this.handleInputChange.bind(this);
          this.state = {
            title:null,
            description:null,
            ingredients:null,
            preparation:null,
    
          };
        }


  CreateRecipe()
  {

    fetch('http://localhost:3000/recipes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: this.state.title,
        description: this.state.description,
        ingredients: this.state.ingredients,
        preparation: this.state.preparation
      })
    }).then(res =>{document.location="/";})
  }


  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }
      render() {

        return (
  
          <div>
            Title<input name="title" type="text" onChange={this.handleInputChange} type="text"/>
            Description<input name="description" onChange={this.handleInputChange}  type="text"/>
            Ingredients<input name="ingredients" onChange={this.handleInputChange} type="text"/>
            Preparation<input name="preparation" onChange={this.handleInputChange} type="text"/>
          <div>
           <button onClick={()=>this.CreateRecipe()}> Add Recipe</button> 
           </div> 
          </div> 
      );  
    }
}
export default Create;