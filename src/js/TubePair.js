import CONFIG from './config'

export default class TubePair {
  constructor(pos) {
    this.pos = pos
    this.width = CONFIG.TUBE_WIDTH
    this.height = 0
    this.lowerEdge = Math.round(Math.random() * CONFIG.TUBE_SPACE_RANGE) + CONFIG.TUBE_MINIMUM_BOTTOM_EDGE
    this.upperEdge = this.lowerEdge + CONFIG.TUBE_SPACE_HEIGHT
  }
}
