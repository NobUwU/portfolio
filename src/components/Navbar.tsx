import React from 'react'
import { Route } from '../types'
import GoodBorger from './GoodBorger'

import "./Navbar.scss"

interface NavbarState {
  current: number
  routes: Route[]
  setCur: (n: number) => void
}

const Navbar: React.FC<NavbarState> = (s) => {
  const [borger, setBorger] = React.useState<boolean>(false)

  return (
    <div id="nav" aria-hidden="true">
      <div className={`inner ${borger ? "open" : ""}`}>
        {
          s.routes.map(i => {
            return (
              <p key={i.id} className={`${ s.current === i.id ? "accent" : "" }`} onClick={() => s.setCur(i.id)}>{i.name}</p>
            )
          })
        }
      </div>
      <div className="borgerArea" onClick={() => setBorger(!borger)}>
        <GoodBorger open={borger} />
      </div>
    </div>
  )
}

export default Navbar
