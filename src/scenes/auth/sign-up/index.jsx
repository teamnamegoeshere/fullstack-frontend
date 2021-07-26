import { useEffect, useState } from "react"

/* sends first and last name, username, email, date of birth,
 password and password confirmation to the Rails Backend /auth/sign_up route
*/

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

    const signUp = () => {
        // set loading state to true
        setLoading(true)
        // send post request to the API
        
        // if success:
            // save JWT to local storage
            // redirect to home page
        // If Fail:
            // display error message to the user
            // stop loading
    }

return (
    // error messages and initial loading
    <>
    {errorMessage}
    {loading && <p>Loading...</p>}


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
    </>
    // or log into an existing account
)
}