
import {DragEventHandler, useState} from 'react'
import styled from 'styled-components';
import { DragDropContext, Position, Draggable, Droppable, DraggableId, DragDropContextProps, 
    OnDragEndResponder, DraggableProvided, DraggableStateSnapshot, DroppableProvided, DropResult, 
    OnDragStartResponder, DragStart, DraggableChildrenFn } from 'react-beautiful-dnd';
import Dropper from './Dropper';


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

const ListGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 8px;
`;

const DND : any = ()  =>{
    //TODO Dummy Data------------------------------------------------------
    const [tasks, setTasks2] : any = useState([
        {
            id: "SSS",
            content: "doStuff!!"
        },
        {
            id: "GGG",
            content: "KAKI!!!!!"
        }
    ]);
    const [tasks2, setTasks] : any = useState([
        {
            id: "AAA",
            content: "YTR! Nahhhhhh!!"
        },
        {
            id: "DDD",
            content: "VGH borrring"
        }
    ]);

    const lists = ["One", "Two", "Three"];

    const getItems = (count : any, prefix : any) =>
    Array.from({ length: count }, (v, k) => k).map((k) => {
        const randomId = Math.floor(Math.random() * 1000);
        return {
        id: `item-${randomId}`,
        prefix,
        content: `item ${randomId}`
        };
    });

    const generateLists = () =>{

        const LI = lists.reduce(
        (acc, listKey) => ({ ...acc, [listKey]: getItems(10, listKey) }),
        {}  
    );
        console.log(LI);
        return LI;
    }

    const generateDummyData = () => {
        return {
            One:
            [
                {id: '1', prefix: 'One', content: 'Hello'},
                {id: '2', prefix: 'One', content: 'World'},
                {id: '3', prefix: 'One', content: 'How'},
                {id: '4', prefix: 'One', content: 'Are'},
                {id: '5', prefix: 'One', content: 'You'},
            ],
            Two:
            [
                {id: '6', prefix: 'Two', content: 'Could'},
                {id: '7', prefix: 'Two', content: 'Some'},
                {id: '8', prefix: 'Two', content: 'Kind'},
                {id: '9', prefix: 'Two', content: 'Of'},
                {id: '10', prefix: 'Two', content: 'Book'},
            ],
            Three:
            [
                {id: '11', prefix: 'Three', content: 'Be'},
                {id: '12', prefix: 'Three', content: 'Told'},
                {id: '13', prefix: 'Three', content: 'To'},
                {id: '14', prefix: 'Three', content: 'Have'},
                {id: '15', prefix: 'Three', content: 'Been'},
            ],
        } 
    }

    //TODO Dummy Data------------------------------------------------------
    const [elements, setElements] : any = useState(generateLists());
    const [items, setItems] : any = useState(generateDummyData());

    const onDragStart : OnDragStartResponder | undefined = (result : DragStart) => {
        // console.log(result.draggableId)
        // console.log(result.mode)
        // console.log(result.source)
        // console.log(result.type)
    }

    const  onDragEnd : DraggableChildrenFn | any = (result : any) => {
        if (!result.destination){
            return;
        }
        // if (
        //     result.destination.droppableId === result.source.droppableId &&
        //     result.destination.index === result.source.index
        // ) return;

        const bMoveToDifferentColumn = result.source.droppableId !== result.destination.droppableId;
        console.log(`Moving item in ${bMoveToDifferentColumn ? 'a different' : 'the same'} list`)
        console.log(`Meaning, from ${result.source.droppableId} to ${result.destination.droppableId}`);
        if(bMoveToDifferentColumn){
            // const newItems = [...items];
            // const [removed] = newItems.splice(result.source.index, 1); //TODO HEREEEEEEEEEEEEEEEEEEEEEEEEEEEEE
            // console.log("removed Item is:");
            // console.log(removed);
            // console.log(newItems);
            // newItems.splice(result.destination.index, 0, removed);
            // setItems(newItems);
        }else{
            // const newItems = [...items];
            // const [removed] = newItems.splice(result.source.index, 1);
            // newItems.splice(result.destination.index, 0, removed);
            // setItems(newItems);
        }
        //console.log(elements);
        // for (let elem in elements){
        //     console.log("looping over all elements...")
        //     console.log(elem);
        //     if( elem == result.source.droppableId){
        //         const newItems = [...items];
        //         const [removed] = elements[elem].splice(result.source.index, 1);
        //         console.log("removed item is:");
        //         removed.prefix = result.destination.droppableId;
        //         console.log(removed);
        //         newItems.
        //     }
        //     for (let i of elements[elem]){
        //         console.log("list members are:");
        //         console.log(i);
        //     }
        //     console.log()
        // }
        const newItems = items;
        console.log('newItems INIT IS: ');
        console.log(newItems);
        //console.log("RELEVANT LIST IS:");
        //prepare data - 
        
        
        //get source
        const sourceElem = result.source.droppableId;
        const sourceList : [] = newItems[sourceElem];
        const sourceBeforeSection : any[] = sourceList.slice(0, result.source.index);
        const sourceAfterSection : any[] = sourceList.slice(result.source.index + 1, sourceList.length);

        //get destination
        const destinationElem = result.destination.droppableId;
        const destinationList : [] = newItems[destinationElem];
        const destinationBeforeSection: any[] = destinationList.slice(0, result.destination.index);
        const destinationAfterSection: any[] = destinationList.slice(result.destination.index, destinationList.length);
        
        // console.log('sourceList:')
        // console.log(sourceList)
        // console.log('destinationList:')
        // console.log(destinationList)

        //manipulate data - 
        const [selectedItem] = newItems[sourceElem].splice(result.source.index, 1);
        selectedItem.prefix = result.destination.droppableId;
        newItems[destinationElem].splice(result.destination.index, 0, selectedItem);

        // const fromArray : any[] = [...sourceBeforeSection, ...sourceAfterSection]
        // const toArray : any[] = [...destinationBeforeSection, selectedItem, ...destinationAfterSection];

        // console.log('fromArray is:')
        // console.log(fromArray)
        // console.log('toArray is:')
        // console.log(toArray) 

        // //TODO
        // console.log('newItems[destinationElem] BEFORE change - is: ');
        // console.log(newItems[destinationElem])
        // //newItems[destinationElem] = toArray;
        // console.log('newItems[destinationElem] AFTER change - is: ');
        // console.log(newItems[destinationElem])
        // console.log('newItems is now: ')
        // console.log(newItems);

        setItems(newItems);
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
    <div>
        <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
            <ListGrid>
                {lists.map((listKey) => (
                    <Dropper key={listKey} droppableId={`${listKey}`} type='COL1' items={items[listKey]}/>
                ))}
            </ListGrid>
        </DragDropContext>
    </div>
    
  );
}

export default DND;