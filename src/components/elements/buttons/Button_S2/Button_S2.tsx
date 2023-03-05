
export default function Button_S2({children, className, onClick} : any) {
    return (
      <>
        <button className={`btn-base btn-style-1 font-9 ${className}`} onClick={onClick}>
            {children}
        </button>
      </>
    )
  }