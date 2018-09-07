import React, {Component, PureComponent} from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Create from './Create';
import Recipe from './Recipe.js';

class RecipeList extends React.PureComponent{

  handleClick = (e) => {
    e.preventDefault();
    console.log('The link was clicked.');
  };

  constructor(props) {
      super(props); 
          this.state = {
          recipeId: null,
          id: null,
          order: "order=title.asc",
          criteria: null,
          results: null,
          error: null,
          body: null
          };
          
        fetch("http://localhost:3000/recipes")  
        .then(
          res =>{
            if(res.status===200)
            {
              return res.json();
            }
            else {
              this.setState({error: res})
            }
          }
        ).then(results=> {
          this.setState({results})
        })     
      }

      
      deleteRecipe(recipeId){
    
        fetch("http://localhost:3000/recipes?id=eq."+recipeId, {
          method: 'DELETE',
        }).then(
          res =>{
            if(res.status===200)
            {
              return res.json();
            }
            else {
              this.setState({error: res})
            }
          }
        ).then(results=> {
          window.location.reload();
        })  
      }
      handleSubmit(event) { 
        event.preventDefault();
      }

      render() {
        return (
          <div>
            {this.state.results != null &&  
              <div className="results">
                     <h1> There Are {this.state.results.length} Recipes:</h1> 
                      <h2 className="create"><Link to="/Create">Add new recipe</Link></h2> 
                          {this.state.results.map( results => { 
                              return (                   
                                <div className="recipe" key={results.id} id={results.id}>       
                                  <div><h2>
                                    <Link to={`/recipe/${results.id}`}> {results.title.toUpperCase() }</Link> </h2>
                                    <h3>
                                    <Link to={`/edit/${results.id}`}> EDIT </Link>
                                    <Link to={`/`} onClick={()=>this.deleteRecipe(results.id)}> DELETE </Link>
                                    </h3>
                                  </div>          
                                </div>
                              ) 
                          })}  
                       
                      <Route path="/:id" component={Recipe} />
              </div> 
            }
            {this.state.error != null && 
              <div className="results"> 
                      <div><h2> Error: {this.state.error.status} {this.state.error.value} {}</h2>          
                      </div>
              </div> 
            } 
          </div>  
      );  
    }
}
    export default RecipeList;