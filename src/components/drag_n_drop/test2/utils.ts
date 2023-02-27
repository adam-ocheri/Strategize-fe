import { Draggable, Droppable } from "react-beautiful-dnd";

/**
*
*/
export const clone = (data: any) => {
  return JSON.parse(JSON.stringify(data));
};
/**
* 是否拖拽到了其他面板
* @param {any} source
* @param {any} destination
*/
export const onChange = (source : any, destination : any) => {
  if (
    destination.droppableId === source.droppableId &&
    destination.index === source.index
  ) {
    return true;
  }
  return false;
};
/**
*
*/
export const deleteTask = (data : any, { droppableId, index } : any) => {
  data = clone(data);
  data.columns[droppableId].taskIds.splice(index, 1);
  return data;
};
/**
 *
 */
export const addTask = (data : any, { droppableId, index } : any, taskId : any) => {
  data = clone(data);
  data.columns[droppableId].taskIds.splice(index, 0, taskId);
  return data;
};
  