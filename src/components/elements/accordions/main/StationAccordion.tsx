import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box } from '@chakra-ui/react'
import React, { ReactInstance } from 'react'

export default function StationAccordion({title, children} : {title: string, children : any}) {
  return (
    <Accordion allowMultiple={true} defaultIndex={[0]} margin={'8px'} backgroundColor={'#211f32'} borderBottomRadius={'15px'}>
        <AccordionItem style={{borderBottomLeftRadius: '15px', borderBottomRightRadius: '15px', borderBottomColor: '#f7aa02'}}>
            <h2>
                <AccordionButton className='card-sub-child orange' border={'2px solid #fab50066'} _hover={{border: '2px solid #fab500'}}>
                <Box as="span" flex='1' textAlign='left' className='card-sub-child-2 s2' borderRadius={'6px'} padding={'4px'} color={'#f7aa02'} >
                    {title}
                </Box>
                <AccordionIcon margin={'4px'} />
                </AccordionButton>
            </h2>
            
                <AccordionPanel>
                    {children}
                </AccordionPanel>
        </AccordionItem>
    </Accordion>
  )
}
