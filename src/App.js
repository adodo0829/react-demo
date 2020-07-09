import React, { Component } from "react";
import Todo from './components/Todo'
// import Boss from './components/Boss'
import './styles/app.css'
// import TodoList from './reduxDemo/TodoList'
import Count from "./hooks/Count";

export default class App extends Component {
  render() {
    // console.log('父组件render---app render...')
    return (
      <div>
        <Todo />
        {/* <Boss /> */}
        <hr></hr>
        {/* <TodoList /> */}
        <Count />
        <Count />
      </div>
    )
  }

  // lifecycle
  componentDidMount() {
    // console.log('componentDidMount----App挂载...')
    // 执行网络请求获取数据
    // 可调用setState
  }
}
