import { blots } from 'blots'
import './userComponent.sass'
import html from './userComponent.html'

export default class userComponent {

    constructor() {
        this.init()
        console.log(localStorage.getItem('currentUser'))
    }

    init() {
        this.render()        
    }

    render() {
        blots.draw('#dashboard-content', html)        
    }
}