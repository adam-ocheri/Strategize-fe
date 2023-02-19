import React from 'react'

export default function StretchBox({className, children} : any) {
  return (
    <div className={`border-bright border-top-w0 border-top-solid m5 p5 box-sizing-border ${className}`}>
        <div className='p7'>
            {children && children}
        </div>     
    </div>
  )
}
