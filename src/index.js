import Controller from './js/Controller'
import './style.css'

const viewEle = document.querySelector('.game-view')
const controller = new Controller()
controller.bindView(viewEle)

/* 防止在iOS微信中出现黑底 */
document.addEventListener('touchmove', function(e) {
  e.preventDefault()
  e.stopPropagation()
})
document.addEventListener('touchend', function(e) {
  e.preventDefault()
  e.stopPropagation()
})
