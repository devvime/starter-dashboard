
import './components/default/theme/theme.sass'
import bootstrap from 'bootstrap'
import { blots } from 'blots'
import PageNotFoundComponent from './components/default/pageNotFound/PageNotFoundComponent.js'
import Login from './components/login/LoginComponent.js'
import DashboardComponent from './components/dashboard/DashboardComponent'
import HomeComponent from './components/dashboard/pages/home/HomeComponent'
import UserComponent from './components/dashboard/pages/config/user/userComponent'

window.blots = blots

blots.route('/', () => new Login)
blots.route('/recover-password/:token', (req) => new Login(req))
blots.route('/dashboard', () => new DashboardComponent({ child: HomeComponent }))
blots.route('/user/config', () => new DashboardComponent({ child: UserComponent }))
blots.route('*', () => new PageNotFoundComponent)

blots.start()