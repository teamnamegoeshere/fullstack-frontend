import axios from "axios"

// sets url to the backend depending in whether a production or development environment is detected.

export const setBackendUrl = () => {
    if (process.env.NODE_ENV === "production") {
        return "https://backend.popcornbucketlist.com"
    }

    if (process.env.NODE_ENV === "development") {
        return process.env.REACT_APP_API_URL || "http://localhost:4000"
    }
}

// declare backendUrl

const backendUrl = setBackendUrl()

// create const using axios for backend to be accessible throughout application
export const backend = axios.create({
    baseURL: backendUrl
})

backend.interceptors.request.use((req) => {
    // declare jwt, fetched from browser localStorage
    const jwt = localStorage.getItem('jwt')
    if (jwt) {
        // send JWT back to backend
        req.headers["Authorization"] = `Bearer ${jwt}`
    }
    return req
})

// error helper
export const errorHelper = (error) => {
    let parsedError
    if (error.response){
        if (error.message === "Request failed with status code 401"){
            parsedError = "Whoops, looks like you're not logged in"
        } else if (error.message === "Request failed with status code 500"){
            parsedError = "Something is very wrong with the server"
        }
         else {
        let filteredError = error.response.data
        parsedError = JSON.stringify(filteredError)
        }
    } else {
        parsedError = error.message
    }
    return parsedError
}