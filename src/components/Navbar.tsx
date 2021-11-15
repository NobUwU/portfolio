import React from 'react'
import { Route } from '../types'

import "./Navbar.scss"

interface NavbarState {
  current: number
  routes: Route[]
  setCur: (n: number) => void
}

const Navbar: React.FC<NavbarState> = (s) => {
  return (
    <div id="nav">
      <div className="inner">
        {
          s.routes.map(i => {
            return (
              <p key={i.id} className={`${ s.current === i.id ? "accent" : "" }`} onClick={() => s.setCur(i.id)}>{i.name}</p>
            )
          })
        }
      </div>
    </div>
  )
}

export default Navbar
