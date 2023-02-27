
import React, { useState } from 'react';
import VisibilitySensor from 'react-visibility-sensor';

export default function ScrollFadeMulti({children} : any) {
  // const [isVisible, setIsVisible] = useState([]);

  // const onChange = (isVisible: boolean) => {
  //   setIsVisible(isVisible);
  //   console.log('Checking visibility:')
  //   console.log(isVisible);
  // };

  // return (
  //   <>
  //     <div className={`flex f-wrap p1 m1 j-center j-even}`}>
  //       {React.Children.map(children, (child, index) => (
          
  //         <div className={`child ${index % 2 === 0 ? 'left' : 'right'}`}>
  //           <div className={`${isVisible ? 'fade-in' : 'scroll-element'}`}>
  //             <VisibilitySensor onChange={onChange} partialVisibility>
  //               {child}
  //             </VisibilitySensor>
  //           </div>
  //         </div>
  //       ))}
  //     </div>
    
  //   </>
  // );
}
