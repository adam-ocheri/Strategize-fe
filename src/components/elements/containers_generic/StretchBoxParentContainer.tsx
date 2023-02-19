import React from 'react'
import StretchBox_LoginPage from './StretchBox'

export default function StretchBoxParentContainer({title, children, className}:any) {
  return (
    <section className={`stretch-box-generic-1 j-center jt-center f-wrap f-dir-col ${className}`}>
        <h2 className="jt-center pt7 mt7 pb7 mb7 font-1 s3">{title}</h2>
        <div className="flex f-dir-row j-even jt-center f-wrap"> {/*--------- mt7 pt7 mb7 pb7*/}
          {/* <StretchBox_LoginPage imgSrc={'b3.jpg'} text={'The End Is Nigh You know'} />
          <StretchBox_LoginPage imgSrc={'b2.jpg'} text={`Purpose is destruction. Destruction is purpose`}/>  */}
          {children && children}  
        </div>
    </section>
  )
}
