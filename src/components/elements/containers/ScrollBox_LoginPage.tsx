import React from 'react'
import ScrollBoxContainer_LoginPage from './ScrollBoxContainer_LoginPage'
import ScrollFadeGeneric from 'src/components/layout/ScrollFadeGeneric'

export default function ScrollBox_LoginPage() {


  return (
    <>
        <div className="parent-scroll-container p3 m3">
          <div className="j-center flex p6 m6 jt-center">
            <h2 className="font-3 s3">Empowering Individuals and Teams</h2>
          </div>
          <ScrollBoxContainer_LoginPage/>
          <ScrollBoxContainer_LoginPage/>
          <ScrollBoxContainer_LoginPage/>
          <ScrollBoxContainer_LoginPage/>
        </div>
    </>
  )
}
