import './style/style.scss'
import img from './assets/Webpack.png'
import { person, includes } from './handler'

console.log(new person())
console.log(includes())

// 这里面使用ES6语法需要安装babel-loader,否则会报错
function component () {
  let element = document.createElement('div')
  element.innerHTML = _.join(['Hello', 'World!!'], ' ')
  element.classList.add('main')
  let bigImg = document.createElement('img')
  bigImg.src = img
  element.appendChild(bigImg)
  return element
}

document.body.appendChild(component())