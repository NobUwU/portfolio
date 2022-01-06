import React from 'react'
import { GitHub } from '../assets/icons/GitHub'
import { At } from '../assets/icons/At'
import { Discord } from '../assets/icons/Discord'

import "./About.scss"

const About: React.FC = () => {
  function newLocation(url: string, blank = false): void {
    if (blank) window.open(url)
    else window.location.replace(url)
  }

  return (
    <section className="item-container" tabIndex={-1}>
      <div id="about">
        <div className="content">
          <h1 className="offset-left">Hiya, I'm <span className="accent">Nobu.</span></h1>
          <h1 className="dim">I code things.</h1>
          <p className="offset-down dim crunch">I'm a software developer located in East Moline, Illinois specializing in creating and designing high-quality websites and applications</p>
          <div className="socials">
            <div className="item hover-git" onClick={() => newLocation("https://github.com/nobu-sh")}>
              <GitHub />
            </div>
            <div className="item hover-git" onClick={() => newLocation("https://discord.com/users/316669053957832706", true)}>
              <Discord />
            </div>
            <div className="item hover" onClick={() => newLocation("mailto:chat@nobu.sh", true)}>
              <At />
            </div>
          </div>
          <img src="/render.webp" alt="me" aria-hidden="true" />
        </div>
      </div>
    </section>
  )
}

export default About
