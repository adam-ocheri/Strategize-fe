
export default function Button_S1({children, className, onClick} : any) {
    return (
      <>
        <button className={`btn-base btn-style-1 p2 m7 ml7 mr7 pr7 pl7 font-9 ${className}`} onClick={onClick}>
            {children}
        </button>
      </>
    )
  }