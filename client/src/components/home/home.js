import { blots } from 'blots'
import Mustache from 'mustache'
import $ from 'jquery'
import './home.sass'
import logo from '../../images/raven.png'
import html from './home.html'
import drop from './drops.html'

export default class Home {

  constructor() {
    this.init()
  }

  init() {
    this.render()
    this.rain()
  }

  rain() {
    $('.rain').empty()
    let increment = 0
    let drops = ""
    let backDrops = ""    
    while (increment < 100) {
      let randoHundo = (Math.floor(Math.random() * (98 - 1 + 1) + 1))
      let randoFiver = (Math.floor(Math.random() * (5 - 2 + 1) + 2))
      increment += randoFiver

      const values = {
        increment,
        randoFiver: (randoFiver + randoFiver - 1 + 100),
        randoHundo
      }

      drops += Mustache.render(drop, {...values, direction: 'left'})
      backDrops += Mustache.render(drop, {...values, direction: 'right'})
    }        
    $('.rain.front-row').append(drops)
    $('.rain.back-row').append(backDrops)
  }

  render() {
    blots.draw('#content', html, {logo})
  }
}