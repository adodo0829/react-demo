import React, { Component } from "react";
import Todo from './components/Todo'

export default class App extends Component {

  render() {
    return (
      <div>
        <h3>this is a todo list</h3>
        <Todo />
      </div>
    )
  }
}
