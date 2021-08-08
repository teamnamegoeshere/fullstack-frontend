import { useHistory } from "react-router-dom"

export const LogOut = () => {
    
    const history = useHistory()

    const logOut = () => {
        // clear jwt in local storage
        localStorage.clear()
        // redirect to home page
        history.push("/")
        }
    logOut()
    return (null)
}