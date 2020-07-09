import React, { useState, useEffect } from 'react';

// Hook 使用规则
// 只能在函数最外层调用 Hook。不要在循环、条件判断或者子函数中调用。
// 只能在 React 的函数组件中调用 Hook 
// 自定义的 Hook 

function Count() {
  const [count, setCount] = useState(0)

  // 相当于 componentDidMount 和 componentDidUpdate:
  // 副作用操作
  useEffect((props) => {
    console.log(props)
    // 使用浏览器的 API 更新页面标题
    document.title = `You clicked ${count} times`;
  });

  return (
    <div>
      <p>Count Time: { count }</p>
      <button onClick={() => setCount(count + 1)}>
        单击
      </button>
    </div>
  )
}

export default Count