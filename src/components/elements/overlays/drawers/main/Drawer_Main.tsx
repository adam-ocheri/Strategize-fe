import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Button,
    useDisclosure,
    Input,
    LinkBox,
  } from '@chakra-ui/react'
import { useRef } from 'react'
import Button_S2 from 'src/components/elements/buttons/Button_S2/Button_S2'
import Drawer_Generic from '../generic/Drawer_Generic'
import Accordion_Generic from 'src/components/elements/accordions/generic/Accordion_Generic'



export default function Drawer_Main({visible, changeVisibility, user} : {visible : boolean, changeVisibility : () => void, user : any}) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = useRef(null)
  
    const closeDrawer = () => {
        changeVisibility();
        onClose();
    }
    return (
      <>
        {/* <Button ref={btnRef} colorScheme='teal' onClick={onOpen}>
          Open
        </Button> */}
        <Drawer
          isOpen={visible}
          placement='right'
          onClose={closeDrawer}
          finalFocusRef={btnRef}
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton color={'white'}/>
            <DrawerHeader className='border-bottom-bright b-color-dark-1' borderBottomWidth='2px'><span className='flex f-dir-row j-center white'>STRATEGIZE</span></DrawerHeader>
            <DrawerHeader fontSize={'12pt'} borderBottomWidth='1px'>
                
                <Accordion_Generic title='User Profile'>
                <span className='flex f-dir-row j-between'>
                    <span>{`${user.name}`}</span> | <span>{`${user.email}`}</span>
                </span>
                <Button variant='outline' mr={3} onClick={onClose} style={{width: '91%', margin: '2%'}}>
                    Preferences
                </Button>
                <Button variant='outline' mr={3} onClick={onClose} style={{width: '91%', margin: '2%'}}>
                    Account Settings
                </Button>
                <Button colorScheme='blue'>Log Out</Button>
                </Accordion_Generic>
            </DrawerHeader>
            <DrawerBody>
                <Button variant='outline' mr={3} onClick={onClose} style={{width: '91%', margin: '2%'}}>
                    Projects
                </Button>
                <Button variant='outline' mr={3} onClick={onClose} style={{width: '91%', margin: '2%'}}>
                    Calendar
                </Button>
                <Button variant='outline' mr={3} onClick={onClose} style={{width: '91%', margin: '2%'}}>
                    Planner
                </Button>
                <Button variant='outline' mr={3} onClick={onClose} style={{width: '91%', margin: '2%'}}>
                    Notebook
                </Button>
                <Button variant='outline' mr={3} onClick={onClose} style={{width: '91%', margin: '2%'}}>
                    Workspace
                </Button>
                <Button variant='outline' mr={3} onClick={onClose} style={{width: '91%', margin: '2%'}}>
                    Tools
                </Button>
                <Button variant='outline' mr={3} onClick={onClose} style={{width: '91%', margin: '2%'}}>
                    Statistics
                </Button>
            </DrawerBody>
  
            <DrawerHeader className='border-top-bright b-color-dark-1' borderTopWidth='2px'><span className='flex f-dir-row j-center white'>STRATEGIZE</span></DrawerHeader>
            <DrawerFooter className='b-color-dark-1'>
                <Button colorScheme='purple' mr={3}>Docs</Button>
                <Button colorScheme='purple' mr={3}>Stuff</Button>
                <Button colorScheme='purple' mr={3}>More</Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </>
    )
  }