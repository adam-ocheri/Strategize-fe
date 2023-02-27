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
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const CalendarBase = () => {
  const [date, setDate] : any = useState(new Date());
  const [tasks, setTasks] : any = useState([
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

  const onDragStart = (start : any) => {
    // Mark the task as the currently dragged task
    setDraggedTask(tasks[start.source.index]);
  };

  const onDragUpdate = (update : any) => {
    // Update the dragged task's position based on the current mouse position
    if (update.destination) {
      setDraggedTask(tasks[update.destination.index]);
    }
  };

  const onDragEnd = (result : any) => {
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

  return (
    <div>
      <Calendar
        onChange={setDate}
        value={date}
      />
      <DragDropContext
        onDragStart={onDragStart}
        onDragUpdate={onDragUpdate}
        onDragEnd={onDragEnd}
      >
        <Droppable droppableId={date.toISOString()}>
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {tasks.map((task : any, index : any) => (
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
