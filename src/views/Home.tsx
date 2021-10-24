import React from 'react'

import "./Home.scss"


const Home: React.FC = () => {

  return (
    <div id="home">
      <div id="info">
        <div id="avatar">
          <img src="/avatar-pixel.png" />
        </div>
        {/* <div id="name">
          <h1 className="h">NOBU</h1>
        </div> */}
        <div id="status">
          <h1 className="h">WIP</h1>
          <p className="s">status</p>
        </div>
      </div>
    </div>
  )
}

export default Home
