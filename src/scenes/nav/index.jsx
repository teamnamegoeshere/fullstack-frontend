import {
    Link
  } from "react-router-dom";



export const NavBar = () => {
    if (localStorage.jwt) {
        return (
                <nav>
                    <ul>
                        <p>Popcorn Bucket List</p>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/log-out">Log Out</Link>
                        </li>
                        <li>
                            <Link to="/lists">Lists</Link>
                        </li>
                        <li>
                            <Link to="/movies/search">Movies</Link>
                        </li>
                    </ul>
                </nav>
        )
    } else {
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
                    <li>
                        <Link to="/lists">Lists</Link>
                    </li>
                    <li>
                        <Link to="/movies/search">Movies</Link>
                    </li>
                </ul>
            </nav>
        )
    }
}