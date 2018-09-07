import React, {Component, PureComponent} from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Recipe from './Recipe.js';

class Search extends React.Component{
    constructor(props) {

        var queryString = require('query-string');
        var parsed = queryString.parse(document.location.search);
    
          super(props); 
          this.handleInputChange = this.handleInputChange.bind(this);
            this.state = {
            title: null,
            sTitle: parsed.title,
            searched: (parsed.search=="true"),
            sRes: null,
            id: null,
            }
}
handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  search(sTitle){
    alert("title: " + this.state.sTitle);
    fetch("http://localhost:3000/recipes?title=fts." + this.state.sTitle ).then (
      res =>{
      if(res.status===200)
        {
          alert(res.json());
          return res.json();
        }
        else {
          this.setState({error: res})
        }
      }
    ).then(sRes => {
      this.setState({sRes})
    }) 
  }

  handleSubmit(event) { 
    this.setState({searched: "true"})
    event.preventDefault();
  }

  render() {
    var sRes = this.state.sRes;
    var title = this.state.title;
    var results = this.state.results;
    var searched = this.state.searched;

    return (
      <div>
        <form onSubmit={()=> this.search()}>
        <input name="title" type="text" onChange={this.handleInputChange}/> 
          <button>SEARCH</button>
        </form>
        
    </div>)}
}
    export default Search;
