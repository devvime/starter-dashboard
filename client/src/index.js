
import './components/default/theme/theme.sass'
import { blots } from 'blots'
import pageNotFoundComponent from './components/default/pageNotFound/pageNotFoundComponent.js'
import Login from './components/login/loginComponent.js'
import dashboardComponent from './components/dashboard/dashboardComponent'
import homeComponent from './components/dashboard/pages/home/homeComponent'
import userComponent from './components/dashboard/pages/config/user/userComponent'

window.blots = blots

blots.route('/', () => new Login)
blots.route('/recover-password/:token', (req) => new Login(req))
blots.route('/dashboard', () => new dashboardComponent({ child: homeComponent }))
blots.route('/user-config', () => new dashboardComponent({ child: userComponent }))
blots.route('*', () => new pageNotFoundComponent)

blots.start()