import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person'
import Radium,  {StyleRoot}  from 'radium'

class App extends Component {

  state = {
    persons: [
      {id: 1, name: "Ania",age: 28},
      {id: 2, name: "Sally",age: 34},
      {id: 3, name: "Kath",age: 23},
      {id: 4, name: "Amir",age: 16}
    ],
    otherState: 'sometherstate',
    showContent: true
  }

  // switchNameHandler = (newName) => {
  //   this.setState( {
  //     persons:[
  //       {name: newName,age: 25},
  //       {name: "Sally",age: 34},
  //       {name: "Kath",age: 23},
  //       {name: "Amir",age: 16}
  //     ]
  //   });
  // }

  changedNameHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p=>p.id === id);
    const person = {...this.state.persons[personIndex]};
    person.name = event.target.value;
    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState({persons: persons})

  }

  toggleContentHandler = () => {
    const currentShow = this.state.showContent;
    this.setState({showContent: !currentShow})
  }

  deletePersonHandler = (personIndex) => {
    const persons = this.state.persons;
    persons.splice(personIndex, 1);
    this.setState({persons: persons})
  }

  render() {

    const style = {
      border: '1px solid blue',
      backgroundColor: 'green',
      cursor: 'pointer',
      padding: '8px',
      ':hover': {
        backgroundColor: 'lightgreen',
        color: 'black'
      }
    }

    let persons = null;
    if (this.state.showContent) {
      persons = (
        <div>
          {this.state.persons.map((person, index) => {
            return <Person
              click = {() => this.deletePersonHandler(index)}
              changed = {(event)=>this.changedNameHandler(event, person.id)}
              name={person.name}
              age={person.age}
              key={person.id}/>
          })}
        </div>
      );
      style.backgroundColor = 'red';
      style[':hover'] = {
        backgroundColor: '#f88d8dcc',
        fontWeight: 500
      };
    };

    const classes = []
    if (this.state.persons.length <= 2) {
      classes.push('red');
    }
    if (this.state.persons.length <= 1) {
      classes.push('bold');
    }

    return (
      <StyleRoot >
        <div className="App">
          <h1>Hi, I'm a React App</h1>
          <p className={classes.join(' ')}> This is really working!</p>
          <button
            style = {style}
            onClick={this.toggleContentHandler}>Hide Persons
          </button>
          {persons}
        </div>
      </StyleRoot>
    );
  }
}

export default Radium(App);
