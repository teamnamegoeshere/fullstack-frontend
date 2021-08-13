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
import { MovieSearch } from "./scenes/movie-search"
import { NavBar } from "./scenes/nav"
import { Lists } from "./scenes/lists"
import { CreateList } from "./scenes/create-list"
import { ListDetails } from "./scenes/list-details"
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
            <route path="/movies/search">
              <MovieSearch />
            </route>
            <Route path='/lists/create'> 
              <CreateList />
            </Route>
            <Route path='/lists/update/:id'> 
              <CreateList />
            </Route>
            <Route path='/lists/:id'> 
              <ListDetails />
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
