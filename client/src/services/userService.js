import { api } from "../core/utils/utils";

export default class UserService {

    async getUser() {
        return await api.get('/user')
    }

    async findUser(id) {
        return await api.get(`/user/${id}`)
    }

    async createUser(data) {
        return await api.post('/register', data)
    }

    async updateUser(id, data) {
        return await api.put(`/user/${id}`, data)
    }

    async recoverPass(data) {
        return await api.post('/auth/recover-pass', data)
    }

}