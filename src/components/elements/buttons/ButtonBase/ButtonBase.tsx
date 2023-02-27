import React from 'react'

export default function ButtonBase({children, className, onClick} : any) {
  return (
    <>
        <button className={`btn-base ${className}`} onClick={onClick}>{children}</button>
    </>
  )
}
