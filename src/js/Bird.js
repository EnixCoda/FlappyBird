import CONFIG from './config'

export default class Bird {
  constructor() {
    this.width = CONFIG.BIRD_WIDTH
    this.height = CONFIG.BIRD_HEIGHT
    this.statuses = {
      HEALTHY: 'HEALTHY',
      BUMPED: 'BUMPED',
      DEAD: 'DEAD'
    }
    this.status = this.statuses.HEALTHY
    this.speed = {
      x: CONFIG.FORWARD_SPEED,
      y: 0
    }
    this.pos = {
      x: CONFIG.BIRD_PRESET_POS_X,
      y: CONFIG.BIRD_PRESET_POS_Y
    }
  }

  flap() {
    if (this.status === this.statuses.HEALTHY) this.speed.y = CONFIG.BIRD_FLAP_SPEED
  }

  die() {
    this.status = this.statuses.DEAD
  }

  bump() {
    if (this.status === this.statuses.HEALTHY) {
      this.status = this.statuses.BUMPED
      this.speed.y = CONFIG.BIRD_FLAP_SPEED
      this.speed.x = 0
    }
  }

  run(duration) {
    const finalSpeedY = this.speed.y + duration * CONFIG.GRAVITY
    this.pos.x += Math.round(this.speed.x * duration)
    this.pos.y += Math.round((this.speed.y + finalSpeedY) / 2 * duration)
    this.speed.y = finalSpeedY
    if (this.pos.y <= 0) {
      this.pos.y = 0
      this.die()
    } else if (this.pos.y > CONFIG.WINDOW_HEIGHT) {
      this.pos.y = CONFIG.WINDOW_HEIGHT
      this.speed.y = 0
    }
  }
}
