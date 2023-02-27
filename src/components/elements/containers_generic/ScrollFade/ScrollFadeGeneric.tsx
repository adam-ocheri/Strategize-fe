// import { useEffect, useRef, useState } from "react";

// const useOnScreen = (options : any) => {
//   const ref = useRef(null);
//   const [visible, setVisible] = useState(false);

//   useEffect(() => {
//     const observer = new IntersectionObserver(([entry]) => {
//       setVisible(entry.isIntersecting);
//     }, options);

//     if (ref.current) {
//       observer.observe(ref.current);
//     }

//     return () => {
//       if (ref.current) {
//         observer.unobserve(ref.current);
//       }
//     };
//   }, [ref, options]);

//   return [ref, visible];
// };

// export default function ScrollFadeGeneric() {
//   const [ref, visible] : any = useOnScreen({ rootMargin: "-100px" });

//   useEffect(() => {
//     if (visible) {
//       ref.current.classList.add("fade-in");
//     } else {
//       ref.current.classList.remove("fade-in");
//     }
//   }, [visible]);

//   return (
//     <div ref={ref}>
//       <p>Hello World</p>
//     </div>
//   );
// }

/*
The return [ref, visible]; statement is returning an array containing two values: the ref object and the visible boolean variable. 
This is a common pattern in React hooks, where an array is returned to expose multiple values that can be used by other components.

In this case, the useOnScreen hook is used to determine if a certain element is visible on the screen or not. 
The ref object is used to attach to the element that needs to be observed, and the visible boolean value is used to indicate whether the element is 
currently visible on the screen or not.

This hook is not expected to return any JSX, but rather provides a way for other components to use the ref and visible values to change their behavior 
based on whether the observed element is in view or not.
*/

//! Vanilla Scroll Start ------------------------------------------------------------------------------
// const scrollElement : HTMLElement | null | any = document.querySelector('.scroll-element');

// const isElementInScreen = (element : HTMLElement | any) => {
// const rect : DOMRect = element.getBoundingClientRect();
// return (
//     rect.top >= 0 &&
//     rect.left >= 0 &&
//     rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
//     rect.right <= (window.innerWidth || document.documentElement.clientWidth)
// );
// }

// function handleScroll(){
// if(scrollElement){
//     if (isElementInScreen(scrollElement)){
//     scrollElement?.classList.add('fade-in');
//     }
// }

// }

// window.addEventListener('scroll', handleScroll);
//! Vanilla Scroll End ------------------------------------------------------------------------------

// import { useEffect, useRef, useState } from "react";

// export default function ScrollFadeGeneric (){
//   const imgRef = useRef(null);
//   const [visible, setVisible] = useState(false);

//   useEffect(() => {
//     const observer = new IntersectionObserver(([entry]) => {
//       setVisible(entry.isIntersecting);
//     }, { threshold: 0.5 });

//     console.log('Scroll Visibility is: ' + visible);

//     if (imgRef.current) {
//       observer.observe(imgRef.current);
//     }

//     return () => {
//       if (imgRef.current) {
//         observer.unobserve(imgRef.current);
//       }
//     };
//   }, [imgRef]);

//   return (
//     <div>
      
//       {visible && <img src="b2.jpg" alt="My Image" ref={imgRef} />}
//     </div>
//   );
// };

//! 1 ------------------------------------------------------------------------------
import { useState, useRef } from 'react';
import VisibilitySensor from 'react-visibility-sensor';

export default function ScrollFadeGeneric({children} : any) {
  const [isVisible, setIsVisible] = useState(false);
  // const elementRef = useRef(children);

  const onChange = (isVisible: boolean) => {
    setIsVisible(isVisible);
    console.log('Checking visibility:')
    console.log(isVisible);
  };

  return (
    <>
      <VisibilitySensor className="child-scroll-container" onChange={onChange} partialVisibility>
        <div className={`  ${isVisible ? 'fade-in' : 'scroll-element'}`}> {/*flex f-wrap p1 m1 j-center j-even*/}
          {children}
        </div>
      </VisibilitySensor>
    </>
  );
}

//! 2 ------------------------------------------------------------------------------
// import { useState, useRef, ReactNode, LegacyRef } from 'react';
// import VisibilitySensor from 'react-visibility-sensor';

// type Props = {
//   children: ReactNode;
// };

// export default function ScrollFadeGeneric({ children }: Props) {
//   const [isVisible, setIsVisible] = useState(false);
//   const ref = useRef<HTMLDivElement>(null);

//   const onChange = (visible: boolean) => {
//     setIsVisible(visible);
//   };

//   return (
//     <div className="fade-element-container">
//       <VisibilitySensor onChange={onChange} partialVisibility>
//         <div ref={ref as LegacyRef<HTMLDivElement>} className={`fade-element ${isVisible ? 'fade-in' : 'scroll-element'}`}>
//           {children}
//         </div>
//       </VisibilitySensor>
//     </div>
//   );
// }

//! 3 ------------------------------------------------------------------------------
// import React,{ useState, useRef, useImperativeHandle, forwardRef } from 'react';
// import VisibilitySensor from 'react-visibility-sensor';

// const ScrollFadeGeneric = forwardRef(({ children } : any, ref) => {
//   const [isVisible, setIsVisible] : any = useState(false);
//   const elementRef = useRef(null);

//   const onChange = (isVisible : Boolean) => {
//     setIsVisible(isVisible);
//   };

//   useImperativeHandle(ref, () => ({
//     setIsVisible,
//   }));

//   return (
//     <VisibilitySensor onChange={onChange} partialVisibility>
//       {({ isVisible } : any) => (
//         <div
//           ref={elementRef}
//           className={`fade-element ${isVisible ? 'fade-in' : 'scroll-element'}`}
//         >
//           {React.Children.map(children, (child, index) => {
//             const isLeft = index % 2 === 0;
//             return React.cloneElement(child, {
//               className: `${child.props.className} ${isLeft ? 'left' : 'right'}`,
//             });
//           })}
//         </div>
//       )}
//     </VisibilitySensor>
//   );
// });

// export default ScrollFadeGeneric;

