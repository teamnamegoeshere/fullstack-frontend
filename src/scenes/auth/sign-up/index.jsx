import { useState } from "react"
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom"



// grab backend to use based on environment
import { backend } from '../../../data'

export const SignUp = () => {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConfirmation, setPasswordConfirmation] = useState("")
    const [dateOfBirth, setDateOfBirth] = useState("")
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")

    const history = useHistory()

    /* sends first and last name, username, email, date of birth,
    password and password confirmation to the Rails Backend /auth/sign_up route
    */
    const signUp = async (e) => {
        // prevent default form behaviour
        e.preventDefault()
        // set loading state to true
        setLoading(true)
        // unset error message
        setErrorMessage("")
        // send post request to the backend
        try {
            const { data } = await backend.post("/auth/sign_up", {
                first_name: firstName,
                last_name: lastName,
                email,
                username,
                password,
                password_confirmation: passwordConfirmation,
                date_of_birth: dateOfBirth,
            })

            // if success:
            // save JWT to local storage
            localStorage.setItem('jwt', data.jwt)
            // redirect to home page
            history.push("/")
        } catch (error) {
            // If Fail:
            // display error message to the user
            setErrorMessage(error.message)
            // stop loading
            setLoading(false)
        }
        
    }

return (
    // error messages and initial loading
    <>
    {errorMessage}
    {loading && <p>Loading...</p>} 

    {/* Sign up form */}
    <form onSubmit={signUp}>
        <input onChange={(e) => setFirstName(e.target.value)} value={firstName}
        id="firstName" placeholder="first name" />
        <input onChange={(e) => setLastName(e.target.value)} value={lastName}
        id="lastName" placeholder="last name" />
        <input onChange={(e) => setEmail(e.target.value)} value={email}
        id="email" placeholder="email" />
        <input onChange={(e) => setUsername(e.target.value)} value={username}
        id="username" placeholder="username" />
        <input type="password" onChange={(e) => setPassword(e.target.value)}
        value={password} id="password" placeholder="password" />
        <input type="password" onChange={(e) => setPasswordConfirmation(e.target.value)}
        value={passwordConfirmation} id="passwordConfirmation" placeholder="confirm password" />
        <label>
        date of birth
        <input type="date" onChange={(e) => setDateOfBirth(e.target.value)}
        value={dateOfBirth} id="dateOfBirth" />
        </label>
        <input type="submit" value="Submit" />
    </form>

    {/* Link to Log in */}
    <Link to="/log-in">or log into an existing account</Link>
    </>
)
}