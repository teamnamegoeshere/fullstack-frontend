import {
    Link
  } from "react-router-dom";
  

export const NavBar = () => {
    return (
            <nav>
                <ul>
                    <p>Popcorn Bucket List</p>
                    <li>
                    <Link to="/">Home</Link>
                    </li>
                    <li>
                    <Link to="/log-in">Log In</Link>
                    </li>
                    <li>
                    <Link to="/sign-up">Sign Up</Link>
                    </li>
                </ul>
            </nav>
    )
}