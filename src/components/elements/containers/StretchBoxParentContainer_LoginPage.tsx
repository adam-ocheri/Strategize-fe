import React from 'react'
import StretchBox_LoginPage from './StretchBox_LoginPage'
import MultiLinkBox_LoginPage from './MultiLinkBox_LoginPage'

export default function StretchBoxParentContainer_LoginPage() {
  return (
    <section className="stretch-box j-center jt-center f-wrap f-dir-col">
        <h2 className="jt-center pt7 mt7 font-1 s3">Discover a New Way Of Organizing</h2>
        <div className="flex f-dir-row j-even jt-center f-wrap "> {/*--------- mt7 pt7 mb7 pb7*/}
          <StretchBox_LoginPage imgSrc={'b3.jpg'} text={'The End Is Nigh You know'} />
          <StretchBox_LoginPage imgSrc={'b2.jpg'} text={`Purpose is destruction. Destruction is purpose`} />   
        </div>
    </section>
  )
}
