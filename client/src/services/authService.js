import { api, welcome } from "../core/utils/utils"
import { blots } from "blots"
import swal from 'sweetalert'

export default class AuthService {

  async auth(data) {
    return await api.post('/auth', data)
  }

  async verify() {
    return await api.get('/auth/verify').then(res => {
      if (res.data.status === 401) {
        localStorage.removeItem('currentUser')
        localStorage.removeItem('token')
        swal("Ops!", res.data.error, "error");
        blots.redirect('/')
      }
      if (res.data.status === 200) {
        if (!localStorage.getItem('currentUser')) {
          localStorage.setItem('currentUser', JSON.stringify(res.data.result))
          swal(welcome(), res.data.result.name, "success");
        }
      }
    })
  }

}