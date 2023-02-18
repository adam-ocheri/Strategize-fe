import React from 'react'
import { useState, useRef } from 'react';
import VisibilitySensor from 'react-visibility-sensor';
import ScrollFadeGeneric from 'src/components/layout/ScrollFadeGeneric';


export default function ScrollBoxContainer_LoginPage() {

    const [isVisible, setIsVisible] = useState(false);
    // const elementRef = useRef(children);
  
    const onChange = (isVisible: boolean) => {
      setIsVisible(isVisible);
      console.log('Checking visibility:')
      console.log(isVisible);
    };
  return (
    
    <VisibilitySensor onChange={onChange} partialVisibility> 
        <section className={`  ${isVisible ? 'visible' : 'hidden'}`}> {/*flex f-wrap p1 m1 j-center j-even*/}
            <ScrollFadeGeneric>
              <div >
                <img src='b4.jpg' alt='logo' height='200px' width='350px'/>  
                <p >
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                  Earum ipsa incidunt ratione accusamus eligendi, quidem impedit quis,
                </p>
              </div>
            </ScrollFadeGeneric>
        </section>
      </VisibilitySensor>
  )
}

/* AS IF <VisibilitySensor className="parent-scroll-container"> - (The `visible` and `hidden` elements must be nested within a `parent-scroll-container`)*/
