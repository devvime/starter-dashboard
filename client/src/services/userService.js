import { api } from "../core/utils/utils";

export default class UserService {

    async getUsers() {
        return await api.get('/user')
    }

    async createUser(data) {
        return await api.post('/register', data)
    }

    async recoverPass(data) {
        return await api.post('/auth/recover-pass', data)
    }

}