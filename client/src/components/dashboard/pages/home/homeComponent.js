import { blots } from 'blots'
import './HomeComponent.sass'
import html from './HomeComponent.html'
export default class HomeComponent {

  constructor() {
    this.init()
  }

  init() {
    this.render()
  }

  render() {
    blots.draw('#dashboard-content', html)
  }
}