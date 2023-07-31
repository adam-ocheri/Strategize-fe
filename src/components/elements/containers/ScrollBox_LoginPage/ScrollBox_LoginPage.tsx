import React from 'react'
import { useState, useRef } from 'react';
import VisibilitySensor from 'react-visibility-sensor';
import ScrollFadeGeneric from 'src/components/elements/containers_generic/ScrollFade/ScrollFadeGeneric';


export default function ScrollBox_LoginPage({title, imgDir, text} : any) {

    const [isVisible, setIsVisible] = useState(false);
    // const elementRef = useRef(children);
  
    const onChange = (isVisible: boolean) => {
      setIsVisible(isVisible);
      console.log('Checking visibility:')
      console.log(isVisible);
    };
  return (
    
    <VisibilitySensor onChange={onChange} partialVisibility>  
      <section className={`p7 m7 flex ${isVisible ? 'visible' : 'hidden'}`}> {/*flex f-wrap p1 m1 j-center j-even*/}
          <ScrollFadeGeneric>
            <h2 className='mb7 white font-1 s2'>{title}</h2>
            <div className=''>
              <img src={imgDir} alt='logo'/>  
              <p className="m4 font-3 s1 white">
                {text}
              </p>
            </div>
          </ScrollFadeGeneric>
      </section>
    </VisibilitySensor>
  )
}

/* AS IF <VisibilitySensor className="parent-scroll-container"> - (The `visible` and `hidden` elements must be nested within a `parent-scroll-container`)*/
