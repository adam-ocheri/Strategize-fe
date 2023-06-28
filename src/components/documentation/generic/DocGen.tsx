import React from 'react'
import DocumentTemplate from '../docs/document-template/DocumentTemplate'

export default function DocGen() {
  return (
    <div style={{width: '100vw', height: '100vh', background: 'azure', display: 'flex', flexDirection: 'row', paddingTop: '65px'}} >
        <section style={{width:'20vw', height: '100vh', background: 'white', padding: '8px', overflowY: 'scroll'}}>
            <div style={{width: '100%', height: 'fit-content', background: 'blue', borderRadius: '12px', padding: '6px'}}>
                <div style={{width: '100%', height: 'fit-content', background: 'green', borderRadius: '12px', padding: '4px'}}>
                    <h3 className='s4'>Docs</h3>
                    <ul className='s3'>
                        <li>Lorem</li>
                        <li>Ipsum</li>
                        <li>Lorem</li>
                        <li>Ipsum</li>
                        <li>Lorem</li>
                        <li>Ipsum</li>
                        <li>Lorem</li>
                        <li>Ipsum</li>
                        <li>Lorem</li>
                        <li>Ipsum</li>
                        <li>Lorem</li>
                        <li>Ipsum</li>
                        <li>Lorem</li>
                        <li>Ipsum</li>
                        <li>Lorem</li>
                        <li>Ipsum</li>
                        <li>Lorem</li>
                        <li>Ipsum</li>
                        <li>Lorem</li>
                        <li>Ipsum</li>
                        <li>Lorem</li>
                        <li>Ipsum</li>
                        <li>Lorem</li>
                        <li>Ipsum</li>
                    </ul>
                </div>
            </div>
        </section>

        <section style={{width:'80vw', height: '100vh', background: 'red', padding: '8px' }}>
            <div style={{width: '100%', height: '100%', background: 'blue', borderRadius: '12px', padding: '0px'}}>
                <div style={{height: '50px', background: 'aqua', borderTopRightRadius: '12px', borderTopLeftRadius: '12px', borderBottom: '4px solid black', borderTop: '4px solid black'}}>
                    Doc-Nav
                </div>
                <DocumentTemplate/>
            </div>
        </section>
    </div>
  )
}
