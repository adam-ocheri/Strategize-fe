import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/*
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const CalendarBase = () => {
  const [date, setDate] = useState(new Date());
  const [tasks, setTasks] = useState([
    {
        id: '1',
        content: 'doStuff!!'
    },
    {
        id: '2',
        content: 'dontDoStuff!!'
    }
  ]);

  const onDrop = (result: any) => {
    
  };

  const onDragEnd = (result : any) => {
    
  };

  return (
    <div>
      <Calendar
        onChange={setDate}
        value={date}
      />
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="tasks">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {tasks.map((task, index) => (
                <Draggable key={task.id} draggableId={task.id} index={index}>
                  {(provided) => (
                    <div
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}
                    >
                      {task.content}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default CalendarBase;
*/
import { useState } from 'react';
import Calendar from 'react-calendar';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
const CalendarBase = () => {
    const [date, setDate] = useState(new Date());
    const [tasks, setTasks] = useState([
        {
            id: '1',
            content: 'doStuff!!'
        },
        {
            id: '2',
            content: 'dontDoStuff!!'
        }
    ]);
    const [draggedTask, setDraggedTask] = useState(null);
    const onDragStart = (start) => {
        // Mark the task as the currently dragged task
        setDraggedTask(tasks[start.source.index]);
    };
    const onDragUpdate = (update) => {
        // Update the dragged task's position based on the current mouse position
        if (update.destination) {
            setDraggedTask(tasks[update.destination.index]);
        }
    };
    const onDragEnd = (result) => {
        // Clear the currently dragged task
        setDraggedTask(null);
        if (!result.destination) {
            return;
        }
        // Find the date that was dropped onto
        const dateStr = result.destination.droppableId;
        const droppedOnDate = new Date(dateStr);
        // Add the task to the dropped on date
        const newTasks = [...tasks];
        newTasks.splice(result.destination.index, 0, draggedTask);
        setTasks(newTasks);
    };
    return (_jsxs("div", { children: [_jsx(Calendar, { onChange: setDate, value: date }), _jsx(DragDropContext, { onDragStart: onDragStart, onDragUpdate: onDragUpdate, onDragEnd: onDragEnd, children: _jsx(Droppable, { droppableId: date.toISOString(), children: (provided) => (_jsxs("div", { ...provided.droppableProps, ref: provided.innerRef, children: [tasks.map((task, index) => (_jsx(Draggable, { draggableId: task.id, index: index, children: (provided) => (_jsx("div", { ...provided.draggableProps, ...provided.dragHandleProps, ref: provided.innerRef, children: task.content })) }, task.id))), provided.placeholder] })) }) })] }));
};
export default CalendarBase;
