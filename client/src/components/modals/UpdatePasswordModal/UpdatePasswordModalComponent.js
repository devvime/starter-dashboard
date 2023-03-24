import { blots } from 'blots'
import './UpdatePasswordModalComponent.sass'
import html from './UpdatePasswordModalComponent.html'
import $ from 'jquery'
import { serializeForm } from '../../../core/utils/utils'
import swal from 'sweetalert'
import AuthService from '../../../services/AuthService'
import UserService from '../../../services/UserService'
import { parser } from '../../../core/utils/utils'

export default class UpdatePasswordModalComponent {

    constructor() {
        this.authService = new AuthService
        this.userService = new UserService
        this.init()
    }

    init() {
        this.render()
        $('#btnSaveNewPassword').click(() => this.saveNewPassword())
    }

    async saveNewPassword() {
        $('#saveModalLoad').removeClass('load')
        const data = serializeForm('updatePasswordForm')        
        if (this.validate(data)) {
            const user = parser(localStorage.getItem('token'))
            await this.authService.auth({email: user.email, password: data.currentPassword}).then(res => {
                if (res.data.status === 401) {
                    swal('Ops', 'Password incorrect!', 'error')
                    return
                }
                if (res.data.status === 200) {
                    this.userService.updateUser(user.id, {password: data.confirmNewPassword}).then(response => {
                        if (response.data.status === 200) {
                            swal('Ops', 'Password updated successfully!', 'success')
                            $('#saveModalLoad').addClass('load')
                            $('.btn-close').click()
                        }
                        if (response.data.error) {
                            swal('Ops', response.data.error, 'error')
                        }
                    })
                }
            })  
        }        
    }

    validate(data) {
        if (data.currentPassword === '') {
            swal('Ops', 'Current password is required!', 'error')
            document.getElementsByName('currentPassword')[0].classList.add('is-invalid')
            document.getElementsByName('currentPassword')[0].oninput = (e) => e.target.classList.remove('is-invalid')
            return false
        }
        if (data.newPassword === '') {
            swal('Ops', 'Type a new password!', 'error')
            document.getElementsByName('newPassword')[0].classList.add('is-invalid')
            document.getElementsByName('newPassword')[0].oninput = (e) => e.target.classList.remove('is-invalid')
            return false
        }
        if (data.confirmNewPassword === '') {
            swal('Ops', 'Type a new password again!', 'error')
            document.getElementsByName('confirmNewPassword')[0].classList.add('is-invalid')
            document.getElementsByName('confirmNewPassword')[0].oninput = (e) => e.target.classList.remove('is-invalid')
            return false
        }
        if (data.newPassword !== data.confirmNewPassword) {
            swal('Ops', 'Passwords not match!', 'error')
            document.getElementsByName('confirmNewPassword')[0].classList.add('is-invalid')
            document.getElementsByName('confirmNewPassword')[0].oninput = (e) => e.target.classList.remove('is-invalid')
            return false
        }
        return true
    } 

    render() {
        document.querySelector('body').append(blots.createElement(html))
    }
}