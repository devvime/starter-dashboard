import { blots } from 'blots'
import './loginComponent.sass'
import html from './loginComponent.html'
import $ from 'jquery'
import { serializeForm } from '../../core/utils/utils'
import swal from 'sweetalert'
import UserService from '../../services/userService'
import AuthService from '../../services/authService'

export default class loginComponent {

  constructor() {
    this.userService = new UserService
    this.authService = new AuthService
    this.init()
  }

  init() {
    if (localStorage.getItem('token')) {
      blots.redirect('/dashboard')
    }
    this.render()
    this.anyFunctions()
  }

  anyFunctions() {
    $('#btn-register').click(function () {
      loginComponent.displayRegister()
    })
    $('.btn-cancel').click(function () {
      loginComponent.displayLogin()
    })
    $('#btn-login').click((e) => this.login(e))
    $('#send-register').click((e) => this.register(e))
  }

  static displayLogin() {
    $('#register').fadeOut()
    setTimeout(() => {
      $('#login').fadeIn()
    }, 600);
  }

  static displayRegister() {
    $('#login').fadeOut()
    setTimeout(() => {
      $('#register').fadeIn()
    }, 600);
  }

  async register(e) {
    e.preventDefault()
    $('#registerLoad').fadeIn()
    const data = serializeForm('register')
    if (!this.validate(data, 'register')) {
      return
    }
    await this.userService.createUser(data).then(res => {      
      if (res.data.error) {
        swal("Ops!", res.data.error, "error");
      }
      if (res.data.status === 200) {
        swal("Success!", "successfully registered!", "success"); 
        loginComponent.displayLogin()       
      }
      $('#registerLoad').css('display', 'none')
    })    
  }

  disableLoad() {
    $('.load').css('display', 'none')
  }

  async login(e) {
    $('#authLoad').fadeIn()
    e.preventDefault()
    const data = serializeForm('login')
    if (!this.validate(data, 'login')) {
      this.disableLoad()
      return
    }    
    await this.authService.auth(data).then(res => {
      if (res.data.status === 200) {
        localStorage.setItem('token', res.data.token)
        location.href = '/dashboard'
      }
      if (res.data.status === 401) {
        swal("Ops!", res.data.error, "error");
      }
      this.disableLoad()
    })
  }

  validate(data, verify) {
    if (data.name === '') {
      swal("Ops!", "Name is required!", "error");
      $('#newName').addClass('is-invalid')
      $('#newName').on('input', function () {
        $(this).removeClass('is-invalid')
      })
      this.disableLoad()
      return false
    } else if (data.email === '') {
      swal("Ops!", "E-mail is required!", "error");
      switch (verify) {
        case 'login':
          $('#email').addClass('is-invalid')
          $('#email').on('input', function () {
            $(this).removeClass('is-invalid')
          })
          this.disableLoad()
          break
        case 'register':
          $('#newEmail').addClass('is-invalid')
          $('#newEmail').on('input', function () {
            $(this).removeClass('is-invalid')
          })
          this.disableLoad()
          break
      }
      this.disableLoad()
      return false
    } else if (data.pass === '') {
      swal("Ops!", "Password is required!", "error");
      switch (verify) {
        case 'login':
          $('#pass').addClass('is-invalid')
          $('#pass').on('input', function () {
            $(this).removeClass('is-invalid')
          })
          this.disableLoad()
          break
        case 'register':
          $('#newPass').addClass('is-invalid')
          $('#newPass').on('input', function () {
            $(this).removeClass('is-invalid')
          })
          this.disableLoad()
          break
      }
      this.disableLoad()
      return false
    } else {
      return true
    }
  }

  render() {
    blots.draw('#content', html)
  }
}