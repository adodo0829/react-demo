import React, { Component, Fragment } from 'react'

export default class App extends Component {
  constructor() {
    // 继承父类的方法,属性
    super()
    // 组件预定义数据
    this.state = {
      inputValue: 'xxoo',
      dataList: []
    }
  }

  handleInput(e) {
    console.log(e.target.value)
  }

  render() {
    return (
      <Fragment>
        {/* 数据绑定,事件绑定 */}
        <input
          value={this.state.inputValue}
          onChange={this.handleInput}
        />
        <button>add</button>
        <ul>
          <li>serice 1111</li>
          <li>serice 2222</li>
        </ul>
      </Fragment>
    )
  }
}
