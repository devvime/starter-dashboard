import { blots } from 'blots'
import './PageNotFoundComponent.sass'
import html from './PageNotFoundComponent.html'

export default class PageNotFoundComponent {

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