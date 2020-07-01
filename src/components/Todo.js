import React, { Component, Fragment } from "react";
import "../styles/todo.css";
import TodoItem from "./TodoItem";

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
            // ref转发: ref与当前组件DOM实例绑定, 获取DOM, 数据更新,获取新dom要在vdom更新更新后才能获取
            // setState的第二个参数回调, 类似vue的nextTick()回调
            ref={(ele) => { this.myInput = ele }}
          ></input>
          <button onClick={this.add.bind(this)}>新增</button>
        </div>

        <ul>
          {/* 列表渲染, 返回JSX */}
          {this.state.dataList.map((item, index) => {
            return (
              // 父组件直接给子组件传一个方法
              <TodoItem content={item} key={index} index={index} deleteTodoItem={this.delete.bind(this)}></TodoItem>
            );
          })}
        </ul>
      </Fragment>
    );
  }

  // lifecycle
  componentDidMount() {
    this.focus()
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

  focus() {
    this.myInput.focus()
  }
}
