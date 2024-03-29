
export default function Button_S2({children, className, onClick, type, disabled, style} : any) {
    return (
      <>
        <button className={`btn-base ${disabled? 'btn-style-disabled' : 'btn-style-1'} font-9 ${className}`} onClick={onClick} type={type} disabled={disabled} style={style}>
            {children}
        </button>
      </>
    )
  }
