import React from 'react'
import Navbar from '../components/Navbar'
import About from '../sections/About'
import Projects from '../sections/Projects'
import Player from '../components/Player'
import { routes } from '../config'
import {
  useLocation,
  useHistory,
} from 'react-router-dom'

import "./Home.scss"

const Home: React.FC = () => {
  const [cur, setCur] = React.useState<number>()
  const location = useLocation()
  const history = useHistory()
  const container = React.useRef<HTMLDivElement>()

  // Router Logic, IF Current hash & it exists in routes array
  // Then assign it as current slide
  // Else set current slide to 0
  React.useEffect(() => {
    if (isNaN(cur)) {
      const hash = parseInt(location.hash.replace(/#/g, ""))
      if (!isNaN(hash)) {
        if (!routes.map(i => i.id).includes(hash)) setCur(0)
        else setCur(hash)
      } else {
        setCur(0)
      }
    } else {
      history.push(`#${cur}`)
      container.current.style.transition = 'transform 1s ease'
      container.current.style.transform = `translateX(-${window.innerWidth * cur}px)`
    }
  }, [cur])

  // Resize logic, on resize recalculate containers translateX
  React.useEffect(() => {
    function resize(e: UIEvent): void {
      container.current.style.transition = ''
      container.current.style.transform = `translateX(-${window.innerWidth * cur}px)`
      setTimeout(() => container.current.style.transition = 'transform 1s ease')
    }

    window.addEventListener('resize', resize)

    return () => window.removeEventListener('resize', resize)
  }, [cur])

  return (
    <div id="home">
      <Navbar current={cur} setCur={setCur} routes={routes} />
      <div className="container" ref={container}>
        <About />
        <Projects />
      </div>
      <Player />
    </div>
  )
}

export default Home
