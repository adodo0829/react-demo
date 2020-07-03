import {
  CHANGE_INPUT,
  ADD_LIST_ITEM,
  DELETE_ITEM
} from './actionType'
// 默认需要管理的状态数据
const defaultState = {
  inputValue: 'to do something',
  list: [
    '学习react',
    '学习redux',
    '学习react hook'
  ]
}

// reducer函数: (previousState, action) => newState
const reducer = (state = defaultState, action) => {
  console.log('reducer处理:', state, action)
  // Reducer里只能接收state，不能改变state

  // 这里需要区分action的类别, 根据type来重写业务逻辑
  if (action.type === CHANGE_INPUT) {
    let newState = JSON.parse(JSON.stringify(state))
    newState.inputValue = action.value
    return newState
  }

  if (action.type === ADD_LIST_ITEM) {
    let newState = JSON.parse(JSON.stringify(state))
    newState.list.push(newState.inputValue)
    newState.inputValue = ''
    return newState
  }

  if (action.type === DELETE_ITEM) {
    let newState = JSON.parse(JSON.stringify(state))
    let index = action.index
    newState.list.splice(index, 1)
    return newState
  }

  return state
}

export default reducer
