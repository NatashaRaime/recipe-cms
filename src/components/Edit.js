import React, {Component, PureComponent} from "react";
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Recipe from './Recipe.js';

class Edit extends React.Component {

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
                recipeId: null,
                recipe:null
        
              };
              var recipeId = 1;
              if(this.props!=null)
              {
                  
              var path = this.props.location.pathname.split('/');
              var recipeId = 1;
              if(path.length>2)
              {
                  recipeId = path[2];
              }
          }
              fetch("http://localhost:3000/recipes?id=eq."+ recipeId)  
              .then(
                res =>{
                  if(res.status===200)
                  {
                    return res.json()
                  }
                  else {
                    this.setState({error: res})
                  }
                }
              ).then(recipe => {
                this.setState({recipeId:recipe[0].id});
                this.setState({title:recipe[0].title});
                this.setState({description:recipe[0].description});
                this.setState({ingredients:recipe[0].ingredients});
                this.setState({preparation:recipe[0].preparation});
                
              })
            }
        
          
    Edit(){
        fetch("http://localhost:3000/recipes?id=eq." + this.state.recipeId,  {
      method: 'PATCH',
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
            <div id={this.props.recipeId}>
            <h3>
            Title       <input name="title" onChange={this.handleInputChange} type="text" value={this.state.title}/>
            Description<input name="description" onChange={this.handleInputChange}  type="text" value={this.state.description}/>
            ingredients<input name="ingredients" onChange={this.handleInputChange} type="text" value={this.state.ingredients}/>
            preparation<input name="preparation" onChange={this.handleInputChange} type="text" value={this.state.preparation}/></h3>          
            
            <div><h3><button type="button" onClick={()=>this.Edit()}>Submit Changes</button></h3></div>
          </div>  
      );  
    }
}
    export default Edit;