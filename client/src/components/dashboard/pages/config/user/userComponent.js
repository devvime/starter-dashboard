import { blots } from 'blots'
import $ from 'jquery'
import swal from 'sweetalert'
import './UserComponent.sass'
import html from './UserComponent.html'
import { parser } from '../../../../../core/utils/utils'
import UpdatePasswordModalComponent from '../../../../modals/updatePasswordModal/updatePasswordModalComponent'
import { serializeForm } from '../../../../../core/utils/utils'
import UserService from '../../../../../services/UserService'

export default class UserComponent {

  constructor() {
    this.states()
    this.init()
  }

  states() {
    this.user = parser(localStorage.getItem('currentUser'))
    this.currentUser = {}
    this.userService = new UserService
    this.updatePasswordModal = new UpdatePasswordModalComponent()
  }

  async init() {
    await this.getCurrentUser()
    await this.render()    
    $('#btnUpdateUser').click(() => this.updateUser())
  }

  async getCurrentUser() {
    await this.userService.findUser(this.user.id).then(res => {
      if (res.data.status === 200) {
        this.currentUser = res.data.data
      }
      if (res.data.error) {
        swal('Ops', res.data.error, "danger");
      }
    })
  }

  async updateUser() {
    $('#saveLoad').removeClass('load')
    const data = serializeForm('updateUserForm')
    await this.userService.updateUser(this.user.id, data).then(res => {
      if (res.data.status === 200) {
        this.currentUser = res.data.data
        this.refresh()
        swal('Success', 'Data updated successfully!', "success");
      }
      if (res.data.error) {
        swal('Ops', res.data.error, "danger");
      }
    })
    $('#saveLoad').addClass('load')
  }

  render() {
    blots.draw('#dashboard-content', html, {
      user: {
        img: this.currentUser.image || 'https://images.unsplash.com/photo-1615751072497-5f5169febe17?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80',
        name: this.currentUser.name,
        email: this.currentUser.email,
        info: this.currentUser.info
      }
    })
  }

  refresh() {
    this.render()
    this.init()
  }
}