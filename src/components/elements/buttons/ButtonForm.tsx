import React from 'react'

export default function ButtonForm({text, disabled, additionalStyles} : any) {
  return (
    <button className={`btn-base ${disabled ?'btn-form-disabled' : 'btn-form'} ${additionalStyles} `} disabled={disabled} type='submit'>
      {text}
    </button>
  )
}
