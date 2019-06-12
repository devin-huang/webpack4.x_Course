import './style/style.scss'
import img from './assets/Webpack.png'

function component () {
  let element = document.createElement('div')
  element.innerHTML = _.join(['Hello', 'World!!'], ' ')
  element.classList.add('main')
  var bigImg = document.createElement('img')
  bigImg.src = img
  element.appendChild(bigImg)
  return element
}

document.body.appendChild(component())