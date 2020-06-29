import React, { Component, Fragment } from "react";
import "../styles/todo.css";

export default class Todo extends Component {
  constructor(props) {
    super(props);
    // 组件预渲染定义的数据
    this.state = {
      inputValue: "",
      dataList: ["hello", "world", "react"],
    };
  }

  // 返回一段jsx
  render() {
    return (
      <Fragment>
        {
          // 这是注释
          // 不想用 div 包裹呢? 导入Fragment组件进行处理
          // 条件和列表渲染: 返回一段jsx即可
        }
        <div>
          <label htmlFor="todo">TODO LIST</label>
          <br />
          <input
            id="todo"
            className="input"
            value={this.state.inputValue}
            onChange={this.handleChange.bind(this)}
          ></input>
          <button onClick={this.add.bind(this)}>新增</button>
        </div>

        <ul>
          {/* 列表渲染, 返回JSX */}
          {this.state.dataList.map((item, index) => {
            return (
            	<li key={index} onClick={this.delete.bind(this, index)}>
								{ index % 2 === 0 ? item : item+' odd' }
							</li>
            );
          })}
        </ul>
      </Fragment>
    );
  }

  handleChange(e) {
    // 设置响应式数据
    this.setState({ inputValue: e.target.value });
  }

  add() {
    this.setState({
      dataList: [...this.state.dataList, this.state.inputValue],
      inputValue: "",
    });
  }

  delete(i) {
    console.log(i);
    let temp = this.state.dataList;
    temp.splice(i, 1);
    this.setState({
      dataList: temp,
    });
  }
}
