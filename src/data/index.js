import axios from "axios"

// sets url to the backend depending in whether a production or development environment is detected.

export const setBackendUrl = () => {
    if (process.env.NODE_ENV === "production") {
        return "http://backend.popcornbucketlist.com"
    }

    if (process.env.NODE_ENV === "development") {
        return process.env.REACT_APP_API_URL || "http://localhost:4000"
    }
}

// declare backendUrl

const backendUrl = setBackendUrl()

// declare jwt, fetched from browser localStorage

const jwt = localStorage.getItem('jwt')

// create const using axios for backend to be accessible throughout application
// and send JWT back to backend
export const backend = axios.create({
    baseURL: backendUrl,
    headers: {
        "Authorization": `Bearer ${jwt}`
    }
})