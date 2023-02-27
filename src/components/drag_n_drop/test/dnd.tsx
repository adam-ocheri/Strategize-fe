
import {DragEventHandler, useState} from 'react'
import { DragDropContext, Position, Draggable, Droppable, DraggableId, DragDropContextProps, OnDragEndResponder, DraggableProvided, DraggableStateSnapshot, DroppableProvided, DropResult, OnDragStartResponder, DragStart, DraggableChildrenFn } from 'react-beautiful-dnd';
import ListItem from './ListItem';
import Dropper from './Dropper';
import Dragger from './Dragger';

interface DataElement {
    id: string;
    content: string;
}

interface DraggableLocation {
    droppableId: string;
    index: number;
}

interface Combine {
    draggableId: string;
    droppableId: string;
}

interface DragResult {
    reason: 'DROP' | 'CANCEL';
    destination?: DraggableLocation;
    source: DraggableLocation;
    combine?: Combine;
    mode: 'FLUID' | 'SNAP';
    draggableId: DraggableId;
}

type DropReason = 'DROP' | 'CANCEL';

type DropAnimation = {
  // how long the animation will run for
  duration: number;
  // the animation curve that we will be using for the drop
  curve: string;
  // the x,y position will be be animating to as a part of the drop
  moveTo: Position;
  // when combining with another item, we animate the opacity when dropping
  opacity: number | null | undefined;
  // when combining with another item, we animate the scale when dropping
  scale: number | null | undefined;
};

type List = DataElement[]

export const clone = (data: any) => {
    return JSON.parse(JSON.stringify(data));
};

const DND : any = ()  =>{
    const [tasks, setTasks] : any = useState([
        {
            id: "AAA",
            content: "YTR! Nahhhhhh!!"
        },
        {
            id: "DDD",
            content: "VGH borrring"
        }
    ]);

    const [tasks2, setTasks2] : any = useState([
        {
            id: "SSS",
            content: "doStuff!!"
        },
        {
            id: "GGG",
            content: "KAKI!!!!!"
        }
    ]);

    const [items, setItems] = useState(tasks);

    const onDragStart : OnDragStartResponder | undefined = (result : DragStart) => {
        // console.log(result.draggableId)
        // console.log(result.mode)
        // console.log(result.source)
        // console.log(result.type)
    }

    const  onDragEnd : DraggableChildrenFn | any = (result : any, items : any, setItems : any) => {
        if (!result.destination){
            return;
        }
        if (
            result.destination.droppableId === result.source.droppableId &&
            result.destination.index === result.source.index
        ) return;

        const newItems = [...items];
        const [removed] = newItems.splice(result.source.index, 1);
        newItems.splice(result.destination.index, 0, removed);
        setItems(newItems);
        
        // const newItems : List = Array.from(items);
    }

    function getStyle(style : any, snapshot: DraggableStateSnapshot) {
        if (!snapshot.isDropAnimating) {
          return style;
        }
        const { moveTo, curve, duration } : DropAnimation | any = snapshot.dropAnimation;
        // move to the right spot
        const translate = `translate(${moveTo.x}px, ${moveTo.y}px)`;
        // add a bit of turn for fun
        const rotate = 'rotate(0.5turn)';
      
        // patching the existing style
        return {
          ...style,
          transform: `${translate} ${rotate}`,
          // slowing down the drop because we can
          transition: `all ${curve} ${duration + 1}s`,
        };
      }
  return (
    <DragDropContext onDragStart={onDragStart} onDragEnd={(result) => onDragEnd(result, items, setItems)}>
        <Dropper droppableId='drop1' type='COL1' items={items}/>
    </DragDropContext>
  );
}

export default DND;