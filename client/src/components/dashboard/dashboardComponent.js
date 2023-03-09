import { blots } from 'blots'
import './dashboardComponent.sass'
import html from './dashboardComponent.html'
import logo from '../../images/raven.png'
import $ from 'jquery'
import swal from 'sweetalert'
import AuthService from '../../services/authService'
import { welcome } from '../../core/utils/utils'
import homeComponent from './pages/home/homeComponent'
import userComponent from './pages/config/user/userComponent'

export default class dashboardComponent {

  constructor(props) {
    this.props = props
    this.authService = new AuthService
    this.init()
  }

  async init() {
    await this.authService.verify()
    this.render()
    this.changePage()    
    this.aside()
    this.logout()    
  }

  aside() {
    if (window.innerWidth > 1200) {
      dashboardComponent.openAside()      
      if (!localStorage.getItem('asideIsOpen')) {
        setTimeout(() => {
          dashboardComponent.closeAside()  
        }, 500);
      }
      $('aside').on('mouseover', function() {
        dashboardComponent.openAside()
        localStorage.setItem('asideIsOpen','true')
      })
      $('aside').on('mouseout', function() {
        dashboardComponent.closeAside()
        localStorage.removeItem('asideIsOpen')
      })
    }
    $('.btnMenu').click(function() {
      $('aside').toggleClass('open')  
      $(this).toggleClass('text-light')
      $('.menu .item').click(function() {
        $('aside').removeClass('open')
        $('.btnMenu').removeClass('text-light')
      })
    })
  }

  static openAside() {
    $('aside').css('left','0')
    $('.slide-page').css('transform', 'translateX(200px)')
  }

  static closeAside() {
    $('aside').css('left','-193.8px')
    $('.slide-page').css('transform', 'translateX(0)')
  }

  logout() {
    $('#logout').click(function() {
      swal('Bye-bye', JSON.parse(localStorage.getItem('currentUser')).name, "success");
      localStorage.removeItem('currentUser')
      localStorage.removeItem('token')
      localStorage.removeItem('asideIsOpen')
      blots.redirect('/')
    })
  }

  changePage() {    
    blots.render(this.props.child)
  }

  render() {
    blots.draw('#content', html, {
      logo,
      welcome,
      name: JSON.parse(localStorage.getItem('currentUser'))?.name
    })
  }
}