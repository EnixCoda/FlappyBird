import CONFIG from './config'

export default class View {
  init(viewEle) {
    this.viewEle = viewEle
    this.canvas = document.createElement('canvas')
    this.context = this.canvas.getContext('2d')
    viewEle.appendChild(this.canvas)
    this.update({})
  }

  update({status, statuses = {}, tubesPassed = 0, birdInView, tubesInView = []}) {
    const {width, height} = this.canvas
    if (width !== CONFIG.WINDOW_WIDTH) this.canvas.width = CONFIG.WINDOW_WIDTH
    if (height !== CONFIG.WINDOW_HEIGHT) this.canvas.height = CONFIG.WINDOW_HEIGHT
    this.context.clearRect(0, 0, CONFIG.WINDOW_WIDTH, CONFIG.WINDOW_HEIGHT)
    this.drawSky()
    this.drawBird(birdInView)
    this.drawTubes(tubesInView)
    this.drawGround()
    this.drawScore(tubesPassed)
    this.drawPlayBtn(status === statuses.READY)
  }

  drawSky() {
    this.context.beginPath()
    this.context.rect(0, 0, CONFIG.WINDOW_WIDTH, CONFIG.WINDOW_HEIGHT)
    this.context.fillStyle = '#88f'
    this.context.fill()
    this.context.closePath()
  }

  drawBird(birdInView) {
    if (birdInView) {
      this.context.beginPath()
      this.context.rect(birdInView.left, birdInView.top, CONFIG.BIRD_WIDTH, CONFIG.BIRD_HEIGHT)
      this.context.fillStyle = '#f88'
      this.context.fill()
      this.context.closePath()
    }
  }

  drawGround() {
    this.context.beginPath()
    this.context.rect(0, CONFIG.WINDOW_HEIGHT - CONFIG.GROUND_HEIGHT, CONFIG.WINDOW_WIDTH, CONFIG.GROUND_HEIGHT)
    this.context.fillStyle = '#842'
    this.context.fill()
    this.context.closePath()
  }

  drawPlayBtn(draw) {
    if (draw) {
      this.context.beginPath()
      this.context.fillStyle = '#FFF'
      const center = {
        x: CONFIG.WINDOW_WIDTH / 2,
        y: CONFIG.WINDOW_HEIGHT / 2
      }
      const offset = Math.min(CONFIG.WINDOW_HEIGHT, CONFIG.WINDOW_WIDTH) / 10
      this.context.moveTo(center.x + offset, center.y);
      this.context.lineTo(center.x - offset, center.y - offset);
      this.context.lineTo(center.x - offset, center.y + offset);
      this.context.fill()
      this.context.closePath()
    }
  }

  drawScore(tubesPassed) {
    this.context.fillStyle = "#EEE";
    this.context.font = "60pt Roboto";
    const score = tubesPassed + '';
    const x = CONFIG.WINDOW_WIDTH / 2 - this.context.measureText(score).width / 2;
    const y = CONFIG.WINDOW_HEIGHT / 5;
    this.context.fillText(score, x, y);
  }

  drawTubes(tubesInView) {
    let i = 0
    this.context.fillStyle = '#8f8'
    while (i < tubesInView.length) {
      let tubeInView = tubesInView[i]
      this.context.beginPath()
      this.context.rect(tubeInView.left, tubeInView.top, CONFIG.TUBE_WIDTH, tubeInView.height)
      this.context.fill()
      this.context.closePath()
      i++
    }
  }

  clear() {
  }
}
