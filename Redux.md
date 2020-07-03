# Redux基础

Redux 的适用场景: 多交互、多数据源
<https://www.redux.org.cn/>

```txt
// 功能
用户的使用方式复杂
不同身份的用户有不同的使用方式（比如普通用户和管理员）
多个用户之间可以协作
与服务器大量交互，或者使用了WebSocket
View要从多个来源获取数据

// 组件
某个组件的状态，需要共享
某个状态需要在任何地方都可以拿到
一个组件需要改变全局状态
一个组件需要改变另一个组件的状态
```

## Redux工作流程

Action(dispatch) -> Store -> Reducers(action, state)
                  更新state(Component)
