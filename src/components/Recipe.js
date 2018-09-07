import React from 'react';

class Recipe extends React.Component {
    constructor(props) {
    super(props);

        this.state = {
        recipes: null,
        results: [] 
        }
    
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
  handleSubmit(event) { 
    event.preventDefault();
  }
  render() {

    return (

      <div>
        {this.state.results != null &&  
          <div className="results">
                  <div>  
                      {this.state.results.map( results => { 
                          return (                   
                            <div className="recipe" key={results.id} id={results.id}>       
                              <div>
                                  <h2> {results.title}</h2>
                                  <h2> Details: {results.description}</h2>                   
                                  <h2> Preparation: {results.preparation}</h2>
                                  <h2> ingredients: {results.ingredients}</h2>
                                      
                                  </div>          
                              </div>
                          ) 
                      })}  
                  </div> 
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
   export default Recipe;
