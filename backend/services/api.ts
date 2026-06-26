import axios from "axios"
import { error } from "console";
import { config } from "process";

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || "https://your-api-url.vercel.app/api",
    headers: {
        "Content-Type": "application/json"
    }
})


// APi AUTH for Bearer Token
const apiAuth = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || "https://your-api-url.vercel.app/api",
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