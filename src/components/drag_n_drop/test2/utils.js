/**
*
*/
export const clone = (data) => {
    return JSON.parse(JSON.stringify(data));
};
/**
* 是否拖拽到了其他面板
* @param {any} source
* @param {any} destination
*/
export const onChange = (source, destination) => {
    if (destination.droppableId === source.droppableId &&
        destination.index === source.index) {
        return true;
    }
    return false;
};
/**
*
*/
export const deleteTask = (data, { droppableId, index }) => {
    data = clone(data);
    data.columns[droppableId].taskIds.splice(index, 1);
    return data;
};
/**
 *
 */
export const addTask = (data, { droppableId, index }, taskId) => {
    data = clone(data);
    data.columns[droppableId].taskIds.splice(index, 0, taskId);
    return data;
};
