import React from 'react'
import { ProjectRef } from '../types'
import { projects } from '../config'
import { GitHub } from '../assets/icons/GitHub'
import { Discord } from '../assets/icons/Discord'
import { marked } from 'marked'

import "./Projects.scss"

marked.use({
  renderer: {
    link(href, title, text) {
      if (href === null) {
        return text
      }

      return `<a href="${href}" ${title ? `title="${title}"` : ""} tabindex="-1">${text}</a>`
    },
  },
})

const Icon: React.FC<ProjectRef> = (s) => {
  switch (s.type) {
  case 'github':
    return <GitHub />
  case 'discord':
    return <Discord />
  }
}

const Projects: React.FC = () => {
  function newLocation(url: string, blank = false): void {
    if (blank) window.open(url)
    else window.location.replace(url)
  }

  return (
    <section className="item-container" aria-hidden="true">
      <div id="projects">
        <div className="content">
          {/* <h1>Some Stuff I Made :3</h1> */}
          <br />
          <div className="grid">
            {
              projects.map(project => {
                return (
                  <div
                    key={project.name}
                    className={`item ${project.span ? `span-${project.span}` : ""}`}
                  >
                    <img
                      src={project.image}
                      alt={project.name}
                      aria-hidden="true"
                      style={{
                        objectPosition: project.position || "center center", 
                      }}
                    />
                    <div className="dim"></div>
                    <div className="info">
                      <div className="top">
                        <h1>{project.name}</h1>
                        {
                          project.refs?.map(ref => {
                            return (
                              <div
                                key={ref.type}
                                className={`ref ${ref.type.includes("github") ? "git" : ""}`}
                                onClick={() => newLocation(ref.link)}
                              >
                                <Icon {...ref} />
                              </div>
                            )
                          })
                        }
                      </div>
                      <p className="description light" dangerouslySetInnerHTML={{ __html: marked.parse(project.description) }}></p>
                      <div className="technologies">
                        {
                          project.technologies?.map(tech => <p key={tech} className="light">{tech}</p>)
                        }
                      </div>
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
    </section>
  )
}

export default Projects
