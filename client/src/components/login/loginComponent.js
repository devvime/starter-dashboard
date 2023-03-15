import { blots } from 'blots'
import './loginComponent.sass'
import html from './loginComponent.html'
import $ from 'jquery'
import { serializeForm, parser } from '../../core/utils/utils'
import swal from 'sweetalert'
import UserService from '../../services/userService'
import AuthService from '../../services/authService'

export default class loginComponent {

  constructor(props) {
    this.props = props
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
    this.displayRecoverPassword()
  }

  anyFunctions() {
    $('#btn-register').click(function () {
      loginComponent.displayRegister()
    })
    $('.btn-recover-pass').click(function () {
      loginComponent.displayRecoverPass()
    })
    $('.btn-cancel').click(function () {
      loginComponent.displayLogin()
    })
    $('#btn-login').click((e) => this.login(e))
    $('#send-register').click((e) => this.register(e))
    $('#send-recover-pass').click((e) => this.recoverPass(e))
    $('#send-new-password').click((e) => this.recoverPassword(e))
  }

  static displayLogin() {
    $('#register').fadeOut()
    $('#recover-pass').fadeOut()
    $('#recover-password').fadeOut()
    setTimeout(() => {
      $('#login').fadeIn()
      $('.loading').remove()
    }, 600);
  }

  static displayRegister() {
    $('#login').fadeOut()
    $('#recover-pass').fadeOut()
    $('#recover-password').fadeOut()
    setTimeout(() => {
      $('#register').fadeIn()
    }, 600);
  }

  static displayRecoverPass() {
    $('#login').fadeOut()
    $('#register').fadeOut()
    $('#recover-password').fadeOut()
    setTimeout(() => {
      $('#recover-pass').fadeIn()
    }, 600);
  }

  displayRecoverPassword() {
    if (this.props !== undefined && this.props.params.token) {
      const token = parser(atob(this.props.params.token))
      if (token.user && token.date) {
        $('#login').fadeOut()
        $('#register').fadeOut()
        $('#recover-pass').fadeOut()
        setTimeout(() => {
          $('#recover-password').fadeIn()
          $('.loading').remove()
        }, 600);
      }
    } else {
      loginComponent.displayLogin()
    }
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

  async recoverPass(e) {
    e.preventDefault()
    $('#recoverLoad').fadeIn()
    const data = serializeForm('recover-pass')
    if (!this.validate(data, 'recoverPass')) {
      return
    }
    await this.userService.recoverPass(data).then(res => {
      if (res.data.error) {
        swal("Ops!", res.data.error, "error");
      }
      if (res.data.status === 200) {
        swal("Success!", res.data.success, "success");
        loginComponent.displayLogin()
      }
      $('#recoverLoad').css('display', 'none')
    })
  }

  async recoverPassword(e) {
    e.preventDefault()    
    $('#recoverPasswordLoad').fadeIn()
    const token = parser(atob(this.props.params.token))
    const data = serializeForm('recover-password')
    if (data.newPassword !== data.confirmNewPassword) {
      swal("Ops!", "Passwords not match.", "error")
      this.validateRecoverPassword()
      this.disableLoad()
      return
    } else if (data.newPassword === '' || data.confirmNewPassword === '') {
      swal("Ops!", "Enter a new password.", "error")
      this.validateRecoverPassword()
      this.disableLoad()
      return
    }
    $('#newPassword').removeClass('is-invalid')
    $('#confirmNewPassword').removeClass('is-invalid')    
    const recoverData = {
      data,
      token
    }
    await this.authService.recoverPassword(recoverData).then(res => {
      if (res.data.status === 200) {
        swal("Success", res.data.success, "success")
        blots.redirect('/')
      } else if (res.data.status === 400 || res.data.status === 401) {
        swal("Ops!", res.data.error, "error")
      }
    })
    this.disableLoad()
  }

  validateRecoverPassword() {
    $('#newPassword').addClass('is-invalid')
    $('#newPassword').on('input', function() {
      $(this).removeClass('is-invalid')
    })
    $('#confirmNewPassword').addClass('is-invalid')
    $('#confirmNewPassword').on('input', function() {
      $(this).removeClass('is-invalid')
    })
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
        case 'recoverPass':
          $('#recover-email').addClass('is-invalid')
          $('#recover-email').on('input', function () {
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

  disableLoad() {
    $('.load').css('display', 'none')
  }

  render() {
    blots.draw('#content', html)
  }
}