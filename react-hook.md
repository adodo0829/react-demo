# React Hook
Hooks 是一系列可以加入 React 的特性的函数;

```js
// 1.useState
// 入参: 初始 state;  返回值: 当前 state 以及更新 state 的函数
const [currState, setStateFunc] = setState(initState)

// 2.useEffect
// 数据获取，设置订阅以及手动更改 React 组件中的 DOM 都属于副作用
// 入参: function; 传递一个函数（我们将它称之为“effect”),并且在执行DOM更新之后调用它。

useEffect(() => {
  document.title = `You clicked ${count} times`; // count更新过后触发函数逻辑
});
// 清除副作用: 需要返回一个函数
useEffect(() => {
  // do something
  return function clearup() {
    // do some clear operate
  }
});
useEffect(() => {
  document.title = `You clicked ${count} times`;
}, [count]); // 仅在 count 更改时更新
```