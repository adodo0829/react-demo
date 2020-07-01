import React, { Component } from "react";
import Todo from './components/Todo'

export default class App extends Component {
  render() {
    console.log('render---组件挂载中.......')

    return (
      <div>
        <h1>this is a todo list</h1>
        <Todo />
      </div>
    )
  }

  // lifecycle
  componentDidMount() {
    console.log('componentDidMount----组件挂载完成......')
    // 执行网络请求获取数据
    // 可调用setState
  }
}
