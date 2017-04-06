import CONFIG from './config'

export default class View {
  init(viewEle) {
    this.viewEle = viewEle

    const background = document.createElement('div')
    background.className = 'background'
    viewEle.appendChild(background)
    this.background = background

    const ground = document.createElement('div')
    ground.className = 'ground'
    viewEle.appendChild(ground)
    this.ground = ground
    this.ground.style.height = CONFIG.GROUND_HEIGHT + 'px'

    const score = document.createElement('div')
    score.className = 'score'
    viewEle.appendChild(score)
    this.score = score

    const playBtn = document.createElement('div')
    playBtn.className = 'playBtn'
    viewEle.appendChild(playBtn)
    this.playBtn = playBtn

    const touchLayer = document.createElement('div')
    touchLayer.className = 'touchLayer'
    viewEle.appendChild(touchLayer)
    this.touchLayer = touchLayer

    const bird = document.createElement('div')
    bird.className = 'bird'
    viewEle.appendChild(bird)
    this.bird = bird
  }

  update({status, statuses, tubesPassed, birdInView, tubesInView}) {
    // play button
    const playBtnDisplay = status !== statuses.READY ? 'none' : 'block'
    if (this.playBtn.style.display !== playBtnDisplay) {
      this.playBtn.style.display = playBtnDisplay
    }

    // score
    if (tubesPassed > this.score.innerHTML) {
      this.score.innerHTML = tubesPassed
    }

    // tube
    let tubeElement
    let countTubeElements = this.viewEle.querySelectorAll('.tube').length
    while (countTubeElements < tubesInView.length) {
      tubeElement = document.createElement('div')
      tubeElement.className = 'tube'
      tubeElement.style.width = CONFIG.TUBE_WIDTH + 'px'
      this.viewEle.appendChild(tubeElement)
      countTubeElements++
    }

    const tubeElements = this.viewEle.querySelectorAll('.tube')
    let tubeInView
    let i = 0
    while (i < tubesInView.length) {
      tubeInView = tubesInView[i]
      tubeElement = tubeElements[i]
      tubeElement.style.transform = `translate(${tubeInView.left}px, ${tubeInView.top}px)`
      if (tubeElement.style.height !== tubeInView.height + 'px') tubeElement.style.height = tubeInView.height + 'px'
      i++
    }
    while (i < countTubeElements) {
      tubeElements[i++].style.height = 0
    }

    // bird
    if (birdInView) {
      this.bird.style.width = CONFIG.BIRD_WIDTH + 'px'
      this.bird.style.height = CONFIG.BIRD_HEIGHT + 'px'
      this.bird.style.transform = `translate(${birdInView.left}px, ${birdInView.bottom}px)`
    }

    this.ground.style.height = CONFIG.GROUND_HEIGHT + 'px'
  }

  clear() {
    this.score.innerHTML = 0
    const tubeElements = this.viewEle.querySelectorAll('.tube')
    let countTubeElements = tubeElements.length
    while (countTubeElements--) {
      let tubeElement = tubeElements[countTubeElements]
      tubeElement.parentNode.removeChild(tubeElement)
    }
  }
}
