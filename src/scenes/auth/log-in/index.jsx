import { useState } from "react"
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom"



// grab backend to use based on environment and grab error helper
import { backend, errorHelper } from '../../../data'

export const LogIn = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")

    const history = useHistory()

    /* sends username and password to the Rails Backend /auth/log_in route
    */
    const logIn = async (e) => {
        // prevent default form behaviour
        e.preventDefault()
        // set loading state to true
        setLoading(true)
        // unset error message
        setErrorMessage("")
        // send post request to the backend
        try {
            const { data } = await backend.post("/auth/log_in", {
                username,
                password,
            })

            // if success:
            // save JWT to local storage
            localStorage.setItem('jwt', data.jwt)
            // redirect to home page
            history.push("/")
        } catch (error) {
            // If Fail:
            // display error message to the user
            setErrorMessage(errorHelper(error))
            // stop loading
            setLoading(false)
        }
        
    }

return (
    // error messages and initial loading
    <>
    {errorMessage}
    {loading && <p>Loading...</p>} 

    {/* Login form */}
    <form onSubmit={logIn}>
        <input onChange={(e) => setUsername(e.target.value)} value={username}
        id="username" placeholder="username" />
        <input type="password" onChange={(e) => setPassword(e.target.value)}
        value={password} id="password" placeholder="password" />
        <input type="submit" value="Submit" />
    </form>

    {/* Link to Sign Up */}
    <Link to="/sign-up">or create an account</Link>
    </>
)
}