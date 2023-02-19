import React from 'react'
import ScrollBox_LoginPage from './ScrollBox_LoginPage'
import ScrollFadeGeneric from 'src/components/layout/ScrollFadeGeneric'

export default function ScrollBoxParentContainer_LoginPage() {


  return (
    <>
        <div className="parent-scroll-container p3 m3">
          <div className="j-center flex p6 m6 jt-center">
            <h2 className="font-3 s3">Empowering Individuals and Teams</h2>
          </div>
          <ScrollBox_LoginPage/>
          <ScrollBox_LoginPage/>
          <ScrollBox_LoginPage/>
          <ScrollBox_LoginPage/>
        </div>
    </>
  )
}
