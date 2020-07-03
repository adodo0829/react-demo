import React, { Component } from "react";
import "antd/dist/antd.css";
import { Input, Button, List } from "antd";
import store from "../store/index";
import { CHANGE_INPUT, ADD_LIST_ITEM, DELETE_ITEM } from '../store/actionType'
import { ActionAddListItem, ActionChangInput, ActionDeleteItem } from '../store/actionCreator';

// const data = [
//   "早8点开晨会，分配今天的开发工作",
//   "早9点和项目经理作开发需求讨论会",
//   "晚5:30对今日代码进行review",
// ];

class TodoList extends Component {
  constructor(props) {
    super(props);
    // 为state赋值
    this.state = store.getState();
    this.handleChange = this.handleChange.bind(this);

    // 2.订阅更新
    this.storeChange = this.storeChange.bind(this);
    store.subscribe(this.storeChange);

    this.handleAdd = this.handleAdd.bind(this);
  }
  storeChange() {
    // 将store数据更新到组件
    this.setState(store.getState());
  }

  handleChange(e) {
    const action = ActionChangInput(e.target.value)
    // 1.派发更新, 发布
    store.dispatch(action);
  }

  handleAdd() {
    const action = ActionAddListItem()
    store.dispatch(action)
  }

  deleteItem(index) {
    const action = ActionDeleteItem(index)
    store.dispatch(action)
  }

  render() {
    return (
      <div className="todo-list">
        <div>
          <Input
            placeholder="Basic usage"
            style={{ width: "200px" }}
            onChange={this.handleChange}
          />
          <Button type="primary" onClick={this.handleAdd}>
            新增
          </Button>
        </div>

        <div style={{ margin: "50px", width: "300px" }}>
          <List
            size="small"
            bordered
            dataSource={this.state.list}
            renderItem={(item, index) => <List.Item onClick={this.deleteItem.bind(this, index)}>{item}</List.Item>}
          />
        </div>
      </div>
    );
  }
}

export default TodoList;
