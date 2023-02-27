import React from 'react'

export default function Footer_Homepage({className}:any) {
  return (
    <footer className={`${className}`}>
        <h2 className='p2 m2'> © Stratgeize </h2>
        <section className='pl7 flex f-wrap f-dir-row'>
            <div className='p3 f-basis-2'>
                <h3 className='s2 font-2'>For Teams</h3>   
                <ul style={{listStyle:'none', minWidth: '10vw'}}>
                    <li className='mt1 mb1 font-1 s1'><a>Get Support</a></li>
                    <li className='mt1 mb1 font-1 s1'><a>Suggest a Feature</a></li>
                    <li className='mt1 mb1 font-1 s1'><a>Report a Bug</a></li>
                </ul>
            </div>
            <div className='p3 f-basis-2'>
                <h3 className='s2 font-2'>For Individuals</h3>   
                <ul style={{listStyle:'none', minWidth: '10vw'}}>
                    <li className='mt1 mb1 font-1 s1'><a>Resources</a></li>
                    <li className='mt1 mb1 font-1 s1'><a>Documentation</a></li>
                    <li className='mt1 mb1 font-1 s1'><a>Sign To Newsletter</a></li>
                </ul>
            </div>
            <div className='p3 f-basis-2'>
                <h3 className='s2 font-2'>Support</h3>   
                <ul style={{listStyle:'none', minWidth: '10vw'}}>
                    <li className='mt1 mb1 font-1 s1'><a>Policy</a></li>
                    <li className='mt1 mb1 font-1 s1'><a>Help</a></li>
                    <li className='mt1 mb1 font-1 s1'><a>Report a Bug</a></li>
                </ul>
            </div>
        </section>
    </footer>
  )
}
