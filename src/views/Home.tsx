import React from 'react'
import { GitHub } from '../assets/icons/GitHub'
import { At } from '../assets/icons/At'
import { Discord } from '../assets/icons/Discord'
import {
  useLocation,
  useHistory,
} from 'react-router-dom'

import "./Home.scss"

const routes = [
  {
    id: 0,
    name: "INTRO",
  },
]

const Home: React.FC = () => {
  const [cur, setCur] = React.useState<number>()
  const location = useLocation()
  const history = useHistory()
  const ref = React.useRef<HTMLDivElement>()

  function viewPort(slide: number): void {
    setCur(slide)
  }

  function newLocation(url: string, blank = false): void {
    if (blank) window.open(url)
    else window.location.replace(url)
  }

  React.useEffect(() => {
    if (isNaN(cur)) {
      const hash = parseInt(location.hash.replace(/#/g, ""))
      console.log(hash)
      if (!isNaN(hash)) {
        if (!routes.map(i => i.id).includes(hash)) setCur(0)
        else setCur(hash)
      } else {
        setCur(0)
      }
    } else {
      history.push(`#${cur}`)
      ref.current.style.transition = 'transform 1s ease'
      ref.current.style.transform = `translateX(-${window.innerWidth * cur}px)`
    }
  }, [cur])

  React.useEffect(() => {
    function resize(e: UIEvent): void {
      ref.current.style.transition = ''
      ref.current.style.transform = `translateX(-${window.innerWidth * cur}px)`
      setTimeout(() => ref.current.style.transition = 'transform 1s ease')
    }

    window.addEventListener('resize', resize)

    return () => window.removeEventListener('resize', resize)
  }, [])

  return (
    <div id="home">
      <div className="nav">
        {
          routes.map(i => {
            return (
              <p key={i.id} className={`${ cur === i.id ? "accent" : "" }`} onClick={() => viewPort(i.id)}>{i.name}</p>
            )
          })
        }
      </div>
      <div className="container" ref={ref}>
        <section className="item-container">
          <div id="introduction">
            <div className="content">
              <p className="offset-right accent"> Hiya, I'm</p>
              <h1 className="offset-left">Nobu.</h1>
              <h1 className="dim">I code things.</h1>
              <p className="offset-down dim crunch">I'm a software developer located in East Moline, Illinois specializing in creating and designing high-quality websites and applications</p>
              <div className="socials">
                <div className="item hover-git" onClick={() => newLocation("https://github.com/NobUwU")}>
                  <GitHub />
                </div>
                <div className="item hover-git discord" onClick={() => newLocation("https://discord.com/users/316669053957832706", true)}>
                  <Discord />
                </div>
                <div className="item hover" onClick={() => newLocation("mailto:contact@nobuwu.dev", true)}>
                  <At />
                </div>
              </div>
            </div>
            <img src="/nobu-pixel.png" alt="nobu pixelated" />
          </div>
        </section>
      </div>
      
    </div>
  )
}

export default Home
