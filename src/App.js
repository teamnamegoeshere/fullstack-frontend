import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import './App.css';

import { Home } from "./scenes/home"
import { LogIn } from "./scenes/auth/log-in"
import { SignUp } from "./scenes/auth/sign-up"
import { LogOut } from "./scenes/auth/log-out"
import { NavBar } from "./scenes/nav"
import { Lists } from "./scenes/lists"
import { Footer } from "./scenes/footer"

const App = () => {

  return (
    <>
      <Router>
          <NavBar />

          {/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/log-in">
              <LogIn />
            </Route>
            <Route path="/log-out">
              <LogOut />
            </Route>
            <Route path="/sign-up">
              <SignUp />
            </Route>
            <Route path="/lists">
              <Lists />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
      </Router>
    <Footer />
    </>
  )
}

export default App;
