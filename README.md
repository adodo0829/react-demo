# React 基础入门

项目地址: <https://github.com/appleguardu/react-demo>

## 1.基础环境搭建

这里直接使用 create-react-app[官方脚手架](https://github.com/facebook/create-react-app)

```shell
npm install -g create-react-app # 安装脚手架工具
create-react-app project-name   # 命令创建项目

# yarn 方式创建
yarn create react-app my-app
# npm 方式创建
npm init react-app my-app

# 运行
yarn start 或者 npm start
```

## 2.应用入口 & JSX 语法

### 应用入口

```js
// 入口文件
import React from "react";
import ReactDOM from "react-dom";
// 入口组件
import App from "./App";
// 挂载 App
ReactDOM.render(<App />, document.getElementById("root"));

// 组件
import React, { Component } from "react";

export default class App extends Component {
  render() {
    return <div>Hello React</div>;
  }
}
```

### JSX 语法

JSX 可以看做是 JavaScript 和 XML 组合生成的语法格式, 更好地利用 HTML 语法来创建虚拟 DOM,当遇到`<`,JSX 就当作 HTML 解析,遇到`{`就当 JavaScript 解析;

即: <>为 html 标签语法, {}中为 js 语法

```js
// 官方文档例子: 一段 jsx 元素
// 如果是自定义组件, 首字母需要大写哦
const element = <h1 className="jsx">Hello, JSX!</h1>;
// 会被执行为
const element = React.createElement("h1", { className: "jsx" }, "Hello, JSX!");
// 最终结果, 简化了
const element = {
  type: "h1",
  props: {
    className: "jsx",
    children: "Hello, JSX!",
  },
};
```

## 3.组件渲染 & 数据驱动

### 组件渲染

Component 方法

```js
import React, { Component, Fragment } from "react";

export default class App extends Component {
  render() {
    return (
      // 组件外层包裹
      // <div>
      //   <input />
      //   <button>add</button>
      //   <ul>
      //     <li>serice 1111</li>
      //     <li>serice 2222</li>
      //   </ul>
      // </div>

      // 如果说不想用 div 包裹呢? 导入Fragment组件进行处理
      <Fragment>
        <input />
        <button>add</button>
        <ul>
          <li>serice 1111</li>
          <li>serice 2222</li>
        </ul>
      </Fragment>
    );
  }
}
```

### 数据驱动

setState 方法

```js
<ul>
  {/* 这里生产jsx结构, 不是vue的vfor标签指令 */}
  {this.state.dataList.map((item, index) => (
    <li key={index} onClick={this.delete.bind(this, index)}>{item}</li>
  ))}
</ul>

handleInput(e) {
  // 事件函数中 访问组件this需要在jsx中 显式绑定bind
  // console.log(this) // undefined
  // console.log(e.target.value)
  // console.log(this) // App {}
  this.setState({
    inputValue: e.target.value,
  });
}

delete(index) {
    console.log(index)
    // React是 不建议直接操作state
    // this.state.dataList.splice(index,1)
    // this.setState({
    //   dataList: this.state.dataList
    // })

    // 我们单独用个临时变量存储一下
    let temp = this.state.dataList
    temp.splice(index, 1)
    this.setState({
      dataList: temp
    })
  }
```

## 4.条件和列表渲染

```js
<ul>
  {/* 列表渲染, 返回JSX */}
  {this.state.dataList.map((item, index) => {
    return (
      <li key={index} onClick={this.delete.bind(this, index)}>
        {index % 2 === 0 ? item : item + " odd"}
      </li>
    );
  })}
</ul>
```

## 5.组件传值

父组件向子组件传递内容，通过属性的形式传递, 由于数据单向流, 子组件无法直接修改父组件数据,
子组件通过调用父组件件方法来实现修改父组件数据

```js
// parent
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
            ref={(ele) => {
              this.myInput = ele;
            }}
          ></input>
          <button onClick={this.add.bind(this)}>新增</button>
        </div>

        <ul>
          {/* 列表渲染, 返回JSX */}
          {this.state.dataList.map((item, index) => {
            return (
              // 父组件直接给子组件传一个方法
              <TodoItem
                content={item}
                key={index}
                index={index}
                deleteTodoItem={this.delete.bind(this)}
              ></TodoItem>
            );
          })}
        </ul>
      </Fragment>
    );
  }

  // lifecycle
  componentDidMount() {
    this.focus();
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
    this.myInput.focus();
  }
}

// child
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

  render() {
    // css 为一个对象, 样式属性小驼峰写法
    return (
      <li style={style} onClick={this.handleClick}>
        {this.props.content}
      </li>
    );
  }
}

// 单项数据流: 开发环境下添加props校验
TodoItem.propTypes = {
  index: PropTypes.number,
  content: PropTypes.string,
  deleteTodoItem: PropTypes.func,
};
```

## 6.React 生命周期(4 大阶段)

生命周期阶段: [参考链接](https://zh-hans.reactjs.org/docs/react-component.html)
<https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/>

> init(初始化阶段) -> Mounting(挂载阶段) -> Updating(更新阶段) -> Unmounting(销毁阶段)

生命周期函数(钩子): 某一个时刻组件会自动调用执行的函数

- init

init 阶段叫初始化阶段, constructor 构造器会执行, 初始化一些组件实例的属性或方法等

```js
// 非必要函数: 如果不需要定义属性（props）和状态(state), 没必要显式声明
constructor(props) {
  super(props)
  // 通过给 this.state 赋值对象来初始化内部 state。
  // 为事件处理函数绑定实例
  this.state = { counter: 0 }
  this.handleClick = this.handleClick.bind(this)
}
```

- Mounting

Mounting 阶段叫挂载阶段，伴随着整个虚拟 DOM 的生成, 并插入到 DOM 文档

```js
// 1. static getDerivedStateFromProps(props, state): 调用 render 方法之前调用，并且在初始挂载及后续更新时都会被调用。
static getDerivedStateFromProps(props, state) {
  // 在使用此生命周期时，要注意把传入的 prop 值和之前传入的 prop 进行比较
  // 根据传入的props来更新state内部的值
  // 注意return null
}

// 2.render(必须实现): 页面state或props发生变化时执行。
render() {
  return (
    // <div>jsx元素<div>

    // <Fragment>
    //   <div>xxx1<div>
    //   <div>xxx2<div>
    //   <div>xxx3<div>
    // </Fragment>

    // Portals

    // string/number

    // null...
  )
}

// 3.componentDidMount: 组件挂载完成时被执行。
componentDidMount() {
  console.log('componentDidMount----组件挂载完成......')
  // 执行网络请求获取数据
  // 可调用setState
}
```

- Updating

更新阶段: 当组件的 props 或 state 发生变化时会触发更新

```js
// 顺序如下:
static getDerivedStateFromProps()

// 当 props 或 state 发生变化时，shouldComponentUpdate() 会在渲染执行之前被调用
// 将this.props 与 nextProps 以及 this.state 与nextState 进行比较
shouldComponentUpdate()

render()
getSnapshotBeforeUpdate()
componentDidUpdate()    // 组件被更新完成后触发。页面中产生了新的DOM的元素，可以进行DOM操作
```

- Unmounting

销毁阶段: 组件实例被销毁

```js
componentWillUnmount(); // 组件卸载及销毁之前直接调用
// 可以进行一些清理操作，例如清理定时器，取消Redux的订阅事件等
```

## 7.组件和元素动画

参考文档: <https://reactcommunity.org/react-transition-group/transition>

```js
// 单个元素
render() {
  return (
    <div>
      {/* <h2 className={ this.state.isShow ? 'show' : 'hide' } style={style}>BOSS: huhua</h2> */}
      {/* 动画组件 */}
      <CSSTransition
        in={this.state.isShow}
        timeout={2000}
        classNames="fade"
        // unmountOnExit会移除dom
        unmountOnExit
      >
        <h2 style={style}>BOSS: huhua</h2>
      </CSSTransition>
      <button onClick={this.toggle}>单击切换状态</button>
    </div>
  );
}

// 列表
 <ul>
  {/* 列表渲染, 返回JSX */}
  {/*
    TransitionGroup: 包裹一组列表
    CSSTransition: 列表项使用
  */}
  <TransitionGroup>
    {this.state.dataList.map((item, index) => {
      return (
        // 父组件直接给子组件传一个方法
        <CSSTransition
          timeout={1000}
          classNames="fade"
          key={index+item}
        >
          <TodoItem
            content={item}
            key={index}
            index={index}
            deleteTodoItem={this.delete.bind(this)}
          ></TodoItem>
        </CSSTransition>
      );
    })}
  </TransitionGroup>
</ul>
```
