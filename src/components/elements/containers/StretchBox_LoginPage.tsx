import React from 'react'

export default function StretchBox_LoginPage({imgSrc, text, children} : any) {
  return (
    <div className="border-bright border-top-w0 border-top-solid m5 p5 box-sizing-border">
        <div className='p7'>
        <img src={imgSrc} alt="img" height={'400px'} width={'400px'}/>
            <p className='font-3'>
              {text}
            </p>
            {children && children}
        </div>     
    </div>
  )
}
