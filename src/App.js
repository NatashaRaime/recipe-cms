import React, { PureComponent, Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Recipe from './components/Recipe';
import RecipeList from './components/RecipeList';
import Create from './components/Create';
import Edit from './components/Edit';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      callResp: null,
    }

       this.handleChange = this.setState(this);
       this.handleSubmit = this.setState(this);
       }
   
       handleChange(event) {
         this.setState({value: event.target.value});
       }
     
       handleSubmit(event) {
        alert('submission: ' + this.state(this));
        event.preventDefault();
      }

  render() {
    return (
      <div className="App">
          <Router>
            <div>
              <Route exact path="/" component={RecipeList} />
              <Route path="/recipe" component={Recipe} />
              <Route path="/create" component={Create} />
              <Route path="/edit" component={Edit} />
            </div>
        </Router>
      </div>
    );
  }
}
export default App;
