import { blots } from 'blots'
import './homeComponent.sass'
import html from './homeComponent.html'
export default class homeComponent {

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