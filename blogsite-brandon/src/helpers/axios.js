import axios from 'axios'

const http = axios.create({
    baseURL: 'https://www.brandonriconga.my.id/',
    timeout: 3000
})

export default http