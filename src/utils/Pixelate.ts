/* eslint-disable @typescript-eslint/ban-ts-comment */
type Color = [number, number, number]
interface Config {
  drawTo?: HTMLCanvasElement
  drawFrom?: HTMLImageElement
  scale?: number
  palette?: Color[]
  maxHeight?: number
  maxWidth?: number
}

class Pixelate {
  private drawTo: HTMLCanvasElement
  private drawFrom: HTMLImageElement
  private scale: number
  private palette: Color[]
  private maxHeight: number
  private maxWidth: number
  private ctx: CanvasRenderingContext2D
  constructor(config: Config = {}) {
    this.drawTo = config.drawTo || document.getElementById("pixelcanvas") as undefined
    this.drawFrom = config.drawFrom || document.getElementById("pixelimage") as undefined
    this.hideFromImg()
    this.scale = 
      config.scale && config.scale > 0 && config.scale <= 50
        ? config.scale * 0.01
        : 8 * 0.01
    this.palette = config.palette || [
      [140, 143, 174],
      [88, 69, 99],
      [62, 33, 55],
      [154, 99, 72],
      [215, 155, 125],
      [245, 237, 186],
      [192, 199, 65],
      [100, 125, 52],
      [228, 148, 58],
      [157, 48, 59],
      [210, 100, 113],
      [112, 55, 127],
      [126, 196, 193],
      [52, 133, 157],
      [23, 67, 75],
      [31, 14, 28],
    ]
    this.maxHeight = config.maxHeight
    this.maxWidth = config.maxWidth
    this.ctx = this.drawTo.getContext("2d") 
  }
  public hideFromImg() {
    this.drawFrom.style.visibility = "hidden"
    this.drawFrom.style.position = "fixed"
    this.drawFrom.style.top = "0"
    this.drawFrom.style.left = "0"

    return this
  }
  public setFromImgSource(src: string) {
    this.drawFrom.src = src

    return this
  }
  public setDrawFrom(elm: HTMLImageElement) {
    this.drawFrom = elm

    return this
  }
  public setDrawTo(elm: HTMLCanvasElement) {
    this.drawTo = elm

    return this
  }
  public setPalette(arr: Color[]) {
    this.palette = arr

    return this
  }
  public setMaxWidth(w: number) {
    this.maxWidth = w

    return this
  }
  public setMaxHeight(h: number) {
    this.maxHeight = h

    return this
  }
  public setScale(scale: number) {
    this.scale = scale > 0 && scale <= 50 ? scale * 0.01 : 8 * 0.01
    
    return this 
  }
  public getPalette(): Color[] {
    return this.palette
  }
  public colorSim(color: Color, compare: Color): number {
    let d = 0
    for (let i = 0; i < color.length; i++) {
      d += (color[i] - compare[i]) * (color[i] - compare[i])
    }

    return Math.sqrt(d)
  }
  public similarColor(color: Color): Color {
    let selectedColor: Color
    let currentSim = this.colorSim(color, this.palette[0])
    let nextColor: number
    for (const _color of this.palette) {
      nextColor = this.colorSim(color, _color)
      if (nextColor <= currentSim) {
        selectedColor = _color
        currentSim = nextColor
      }
    }

    return selectedColor
  }
  public pixelate() {
    this.drawTo.width = this.drawFrom.naturalWidth
    this.drawTo.height  = this.drawFrom.naturalHeight

    let scaledW = this.drawTo.width * this.scale
    let scaledH = this.drawTo.height * this.scale

    const tempCanvas = document.createElement("canvas")
    tempCanvas.width = this.drawTo.width
    tempCanvas.height = this.drawTo.height
    tempCanvas.style.visibility = "hidden"
    tempCanvas.style.position = "fixed"
    tempCanvas.style.top = "0"
    tempCanvas.style.left = "0"
    // Fix larger image scale issues
    if(this.drawTo.width > 800 || this.drawTo.width > 800){
      this.scale *= 0.25
      scaledW = this.drawTo.width * this.scale
      scaledH = this.drawTo.height * this.scale
      tempCanvas.width = Math.max(scaledW, scaledH) + 50
      tempCanvas.height = Math.max(scaledW, scaledH) + 50
    }
    const tempContext = tempCanvas.getContext("2d")
    // console.log(scaledW, scaledH)
    // console.log(this.drawFrom)
    tempContext.drawImage(this.drawFrom, 0, 0, scaledW, scaledH)
    document.body.appendChild(tempCanvas)

    // Configure pixelation
    this.ctx.imageSmoothingEnabled = false

    this.ctx.drawImage(tempCanvas, 0, 0, scaledW, scaledH, 0, 0, this.drawFrom.naturalWidth, this.drawFrom.naturalHeight)
    tempCanvas.remove()

    return this
  }
  public convertGreyscale() {
    const w = this.drawTo.width
    const h = this.drawTo.height
    const imgPixels = this.ctx.getImageData(0, 0, w, h)
    for (let y = 0; y < imgPixels.height; y++) {
      for (let x = 0; x < imgPixels.width; x++) {
        const i = y * 4 * imgPixels.width + x * 4
        const avg = (imgPixels.data[i] + imgPixels.data[i + 1] + imgPixels.data[i + 2]) / 3
        imgPixels.data[i] = avg
        imgPixels.data[i + 1] = avg
        imgPixels.data[i + 2] = avg
      }
    }
    this.ctx.putImageData(imgPixels, 0, 0, 0, 0, imgPixels.width, imgPixels.height)

    return this
  }
  public convertPalette() {
    const w = this.drawTo.width
    const h = this.drawTo.height
    const imgPixels = this.ctx.getImageData(0, 0, w, h)
    for (let y = 0; y < imgPixels.height; y++) {
      for (let x = 0; x < imgPixels.width; x++) {
        const i = y * 4 * imgPixels.width + x * 4
        const finalcolor = this.similarColor([
          imgPixels.data[i],
          imgPixels.data[i + 1],
          imgPixels.data[i + 2],
        ])
        imgPixels.data[i] = finalcolor[0]
        imgPixels.data[i + 1] = finalcolor[1]
        imgPixels.data[i + 2] = finalcolor[2]
      }
    }
    this.ctx.putImageData(imgPixels, 0, 0, 0, 0, imgPixels.width, imgPixels.height)

    return this
  }
  public resizeImage() {
    const canvasCopy = document.createElement("canvas")
    const copyContext = canvasCopy.getContext("2d")
    let ratio = 1.0

    if (!this.maxWidth && !this.maxHeight) {
      return this
    }
    if (this.maxWidth && this.drawTo.width > this.maxWidth) {
      ratio = this.maxWidth / this.drawTo.width
    }
    if (this.maxHeight && this.drawTo.height > this.maxHeight) {
      ratio = this.maxHeight / this.drawTo.height
    }
    canvasCopy.width = this.drawTo.width
    canvasCopy.height = this.drawTo.height
    copyContext.drawImage(this.drawTo, 0, 0)
    this.drawTo.width = this.drawTo.width * ratio
    this.drawTo.height = this.drawTo.height * ratio
    this.ctx.drawImage(canvasCopy, 0, 0, canvasCopy.width, canvasCopy.height, 0, 0, this.drawTo.width, this.drawTo.height)

    return this
  }
  public draw() {
    this.drawTo.width = this.drawFrom.width
    this.drawTo.height = this.drawFrom.height
    this.ctx.drawImage(this.drawFrom, 0, 0)
    // this.resizeImage()

    return this
  }
  public saveImage() {
    const link = document.createElement("a")
    link.download = "pixelated.png"
    link.href = this.drawTo
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream")
    document.querySelector("body").appendChild(link)
    link.click()
    document.querySelector("body").removeChild(link)
  }
}

export default Pixelate
