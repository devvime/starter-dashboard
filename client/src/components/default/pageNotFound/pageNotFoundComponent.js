import { blots } from 'blots'
import './pageNotFoundComponent.sass'
import html from './pageNotFoundComponent.html'

export default class pageNotFoundComponent {

    constructor() {
        this.init()
    }

    init() {
        this.render()
    }

    render() {
        blots.draw('#content', html)
    }
}