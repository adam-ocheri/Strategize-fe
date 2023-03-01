import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const DragItem = ({ item, provided, snapshot, className }) => {
    // const style = {
    //   ...provided.draggableProps.style,
    //   backgroundColor: snapshot.isDragging ? 'blue' : 'white',
    //   fontSize: 18,
    // };
    return (_jsxs("div", { className: 'dragger p3 m3 b-color-dark-2', children: [_jsx("h3", { children: item.id }), _jsx("h3", { children: item.content })] }));
};
export default DragItem;
