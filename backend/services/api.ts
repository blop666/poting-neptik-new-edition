import axios from "axios"
import { error } from "console";
import { config } from "process";

const api = axios.create({
    baseURL: "http://localhost:3000/api",
    headers: {
        "Content-Type": "application/json"
    }
})


// APi AUTH for Bearer Token
const apiAuth = axios.create({
    baseURL: "http://localhost:3000/api",
})

apiAuth.interceptors.request.use(
    (config) => {
        const adminToken = localStorage.getItem("admin_token")

        if(adminToken) {
            config.headers.Authorization = `Bearer ${adminToken}`
        }

        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)



export {api, apiAuth};