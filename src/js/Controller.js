import CONFIG from './config'
import Camera from './Camera'
import Bird from './Bird'
import TubePair from './TubePair'
import View from './View'

export default class Controller{
  constructor () {
    CONFIG.calculate()
    this.view = new View()
    this.statuses = {
      READY: 'READY',
      PLAYING: 'PLAYING',
    }
    // this.autoPlay = true
    this.status = this.statuses.READY
    const play = () => {
      if (this.status === this.statuses.PLAYING) this.bird.flap()
      else if (this.status === this.statuses.READY) this.gameStart()
    }

    window.addEventListener('keydown', function ({code, keyCode}) {
      if (code === 'Space' || keyCode === 32) play()
    })
    window.addEventListener('mousedown', play)
    window.addEventListener('touchstart', play)
    window.addEventListener('resize', this.resizeView.bind(this))
  }

  gameStart() {
    this.lastFrameTimestamp = null
    this.bird = new Bird()
    this.tubesGenerated = 0
    this.tubesPassed = 0
    this.tubePairs = []
    this.camera = new Camera()
    while (this.tubesGenerated < Math.ceil(CONFIG.WINDOW_WIDTH / CONFIG.TUBE_SPACE_BETWEEN) + 2) {
      this.tubePairs.push(new TubePair({
        x: CONFIG.OFFSET_TUBE + CONFIG.TUBE_SPACE_BETWEEN * this.tubesGenerated++,
        y: 0
      }))
    }
    this.view.clear()
    this.resizeView()
    this.status = this.statuses.PLAYING
    console.log('game start!')
    window.requestAnimationFrame(this.run.bind(this))
  }

  run(timestamp) {
    if (this.autoPlay) {
      for (const tubePair of this.tubePairs) {
        if (!tubePair.passed) {
          if (
            (tubePair.lowerEdge - this.bird.pos.y) / (tubePair.pos.x - this.bird.pos.x - this.bird.width - this.bird.speed.x * CONFIG.FRAME_DURATION) > CONFIG.BIRD_FLAP_SPEED / CONFIG.FORWARD_SPEED
          ) {
            this.bird.flap()
          }
          continue
        }
      }
    }
    if (this.status !== this.statuses.PLAYING) return

    this.lastFrameTimestamp = this.lastFrameTimestamp || timestamp
    const duration = timestamp - this.lastFrameTimestamp
    this.lastFrameTimestamp = timestamp

    this.bird.run(duration)
    this.camera.run(duration)

    if (this.bird.status === this.bird.statuses.DEAD) {
      console.log('bird fell on ground')
      this.gameOver()
    } else if (this.bird.status === this.bird.statuses.BUMPED) {
      // the bird is falling
      this.camera.slowDown()
    } else {
      for (const tubePair of this.tubePairs) {
        if (this.overlap(tubePair, this.bird)) {
          console.log('bird crashed into tube')
          this.bird.bump()
        }
        if (this.bird.pos.x > tubePair.pos.x && !tubePair.passed) {
          tubePair.passed = true
          this.tubesPassed++
        }
        if (this.bird.pos.x - tubePair.pos.x > CONFIG.TUBE_SPACE_BETWEEN * 2) {
          this.tubePairs.shift()
          this.tubePairs.push(new TubePair({
            x: CONFIG.OFFSET_TUBE + CONFIG.TUBE_SPACE_BETWEEN * this.tubesGenerated++,
            y: 0
          }))
        }
      }
    }
    this.updateView()
    window.requestAnimationFrame(this.run.bind(this))
  }

  bindView(viewEle) {
    this.view.init(viewEle)
  }

  updateView() {
    this.view.update({
      status: this.status,
      statuses: this.statuses,
      tubesPassed: this.tubesPassed,
      birdInView: this.camera && this.camera.getBirdInView(this.bird),
      tubesInView: this.camera && this.camera.getTubesInView(this.tubePairs) || []
    })
  }

  resizeView() {
    if (this.status === this.statuses.READY) {
      CONFIG.calculate()
      this.updateView()
    }
  }

  gameOver() {
    console.log('game over, score: ' + this.tubesPassed)
    this.status = this.statuses.READY
  }

  overlap(tube, bird) {
    if (tube.pos.x < bird.pos.x + bird.width && bird.pos.x < tube.pos.x + tube.width) {
      if (tube.upperEdge < bird.pos.y + bird.height || tube.lowerEdge > bird.pos.y) {
        return true
      }
    }
    return false
  }
}
