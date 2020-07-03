// 集中管理action
import { CHANGE_INPUT, DELETE_ITEM, ADD_LIST_ITEM } from "./actionType";

export const ActionChangInput = (value) => ({ type: CHANGE_INPUT, value });

export const ActionAddListItem = () => ({ type: ADD_LIST_ITEM });

export const ActionDeleteItem = (index) => ({
  type: DELETE_ITEM,
  index
});
