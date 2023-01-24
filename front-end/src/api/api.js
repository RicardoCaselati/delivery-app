import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://localhost:3001'
})

export const loginUser = async({email, password}) => {
    return instance.post('login', { email, password })
}
