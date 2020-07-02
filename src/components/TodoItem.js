import React, { Component } from "react";
import PropTypes from "prop-types"; // props校验

const style = {
  marginLeft: "10px",
  color: "red",
};

export default class TodoItem extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    console.log(this.props);
    this.props.deleteTodoItem(this.props.index);
  }

  // 当 props 或 state 发生变化时，shouldComponentUpdate() 会在渲染执行之前被调用
  // 将this.props 与 nextProps 以及 this.state 与nextState 进行比较
  shouldComponentUpdate(nextProps, nextState) {
    // 优化手段
    return nextProps.content !== this.props.content;
  }

  render() {
    console.log("todoItem: child-render");
    // css 为一个对象, 样式属性小驼峰写法
    return (
      <li style={style} onClick={this.handleClick}>
        {this.props.content}
      </li>
    );
  }
}

// 单项数据流: 开发环境下添加props校验
TodoItem.defaultProps = {
  content: "hello world",
};

TodoItem.propTypes = {
  index: PropTypes.number,
  content: PropTypes.string,
  deleteTodoItem: PropTypes.func.isRequired,
};
