import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import './App.css';

import { Home } from "./scenes/home"
import { LogIn } from "./scenes/auth/log-in"
import { SignUp } from "./scenes/auth/sign-up"
import { NavBar } from "./scenes/nav"

const App = () => {
  return (
    <Router>

        <NavBar />

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/log-in">
            <LogIn />
          </Route>
          <Route path="/sign-up">
            <SignUp />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
    </Router>
  )
}

export default App;
