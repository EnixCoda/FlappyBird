import CONFIG from './config'

/**
 *  +-------------------------> x
 *  |               |    |
 *  |               |    |
 *  | +---+         |    |
 *  | |   |         +----+
 *  | +---+         
 *  | bird           tube
 *  |               +----+
 *  |               |    |
 *  |               |    |
 *  |               |    |
 *  +---------------+----+---
 *  |         ground
 *  +------------------------
 *  |
 *  v  y
 */

export default class Camera{
  constructor() {
    this.pos = {
      x: Math.round(CONFIG.WINDOW_WIDTH / 2),
      y: Math.round(CONFIG.WINDOW_HEIGHT / 2)
    }
    this.speed = {
      x: CONFIG.FORWARD_SPEED,
      y: 0
    }
  }

  run(duration) {
    this.pos.x += Math.round(this.speed.x * duration)
  }

  getTubesInView(tubePairs) {
    const tubesInView = []
    for (const tubePair of tubePairs) {
      if (Math.abs(tubePair.pos.x - this.pos.x) <= CONFIG.WINDOW_WIDTH / 2 + tubePair.width) {
        // 下半部分
        tubesInView.push({
          left: Math.round(CONFIG.WINDOW_WIDTH / 2 - this.pos.x + tubePair.pos.x),
          top: CONFIG.WINDOW_HEIGHT + CONFIG.TUBE_SPACE_HEIGHT - CONFIG.GROUND_HEIGHT - tubePair.upperEdge,
          height: tubePair.lowerEdge
        })
        // 上半部分
        tubesInView.push({
          left: Math.round(CONFIG.WINDOW_WIDTH / 2 - this.pos.x + tubePair.pos.x),
          top: 0,
          height: CONFIG.WINDOW_HEIGHT - CONFIG.GROUND_HEIGHT - tubePair.upperEdge
        })
      }
    }
    return tubesInView
  }

  getBirdInView(bird) {
    return {
      left: Math.round(CONFIG.WINDOW_WIDTH / 2 - this.pos.x + bird.pos.x),
      bottom: Math.round(CONFIG.WINDOW_HEIGHT - bird.pos.y - CONFIG.BIRD_HEIGHT - CONFIG.GROUND_HEIGHT)
    }
  }

  slowDown() {
    this.speed.x = Math.max(this.speed.x * 0.99, 0)
  }
}
