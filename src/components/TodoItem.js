import React, { Component } from "react";
import PropTypes from 'prop-types'; // props校验

const style = {
	marginLeft: '10px',
	color: 'red'
}

export default class TodoItem extends Component {
	constructor(props) {
		super(props)
		this.handleClick = this.handleClick.bind(this)
	}

	handleClick() {
		console.log(this.props)
		this.props.deleteTodoItem(this.props.index)
	}

  render() {
	// css 为一个对象, 样式属性小驼峰写法
	return (<li style={style} onClick={this.handleClick}>{this.props.content}</li>)
  }
}

// 单项数据流: 开发环境下添加props校验
TodoItem.defaultProps = {
	content: 'hello world'
}

TodoItem.propTypes = {
	index: PropTypes.number,
	content: PropTypes.string,
	deleteTodoItem: PropTypes.func.isRequired
}
