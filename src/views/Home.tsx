import React from 'react'
import Pixelate from '../utils/Pixelate'

import "./Home.scss"


const Home: React.FC = () => {

  const ref = React.useRef<HTMLImageElement | null>(null)
  React.useEffect(() => {
    ref.current?.addEventListener('load', () => {
      const p = new Pixelate({
        drawFrom: document.getElementById("piximyselfimg") as undefined,
        drawTo: document.getElementById("piximyself") as undefined,
        scale: 24,
        maxHeight: 300,
      })
      p.draw().pixelate()
        .resizeImage()
        .setPalette([
          [255, 105, 105],
          [255, 145, 145],
          [255, 186, 186],
          [255, 219, 219],
          [255, 255, 255],
          [255, 79, 79],
          [255, 66, 66],
          [204, 80, 80],
          [196, 102, 102],
          [189, 119, 119],
          [189, 136, 136],
          [150, 104, 104],
          [148, 90, 90],
          [145, 78, 78],
          [148, 67, 67],
          [112, 50, 50],
          [105, 54, 54],
          [94, 59, 59],
          [84, 46, 46],
          [64, 31, 31],
          [59, 37, 37],
          [38, 28, 28],
          [36, 22, 22],
          [31, 14, 14],
          [23, 13, 13],
          [18, 12, 12],
          [10, 6, 6],
          [0, 0, 0],
          [255, 215, 115],
          [255, 208, 89],
          [245, 193, 61],
          [227, 187, 86],
          [194, 151, 45],
          [150, 120, 47],
          [122, 105, 64],
          [255, 38, 38],
          [209, 52, 52],
          [166, 33, 33],
          [163, 47, 47],
          [148, 33, 33],
          [99, 35, 35],
          [199, 62, 142],
          // [194, 43, 131],
          [143, 47, 103],
          // [153, 29, 101],
          [122, 33, 85],
          [99, 17, 65],
          [255, 166, 218],
          [255, 194, 230],
          [150, 92, 126],
          [125, 71, 103],
        ])
        .convertPalette()
    })
  }, [])

  return (
    <div id="home">
      {/* <img id="piximyselfimg" src="/avatar.png" alt="me" ref={ref} />
      <canvas id="piximyself"></canvas> */}
      {/* <h1 className="h">Scale = 35</h1> */}
      <div id="info">
        <div id="avatar">
          <img id="piximyselfimg" src="/avatar.png" alt="me" ref={ref} />
          <canvas id="piximyself"></canvas>
        </div>
        {/* <div id="name">
          <h1 className="h">NOBU</h1>
        </div> */}
        <div id="status">
          <h1 className="h">WIP</h1>
          <p className="s">status</p>
        </div>
        {/* <p className="p">User Stats</p> */}
      </div>
    </div>
  )
}

export default Home
