import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import "./App.css";
import { ToastContainer } from "react-toastify";
import Movies from "./components/movies";
import Rentals from "./components/Rentals";
import Seller from "./components/sellers";
import NotFound from "./components/notFound";
import NavBar from "./components/navbar";
import MoviesForm from "./components/moviesForm";
import LoginForm from "./components/loginForm";
import Register from "./components/registerForm";
import "react-toastify/dist/ReactToastify.css";
import Logout from "./components/logout";
import auth from "./services/authService";
import ProtectedRoute from "./components/protectedRoute";
import Profile from "./components/profile";

class App extends Component {
  state = {};
  componentDidMount() {
    const user = auth.getUsersData();
    this.setState({ user });
  }
  render() {
    return (
      <div>
        <main className="container">
          <ToastContainer />
          <NavBar user={this.state.user} />
          <Switch>
            <Route path="/profile" component={Profile} />
            <Route path="/register" component={Register} />
            <Route path="/login" component={LoginForm} />
            <Route path="/logout" component={Logout} />
            <ProtectedRoute path="/movies/:id" component={MoviesForm} />
            <Route
              path="/movies"
              render={props => <Movies {...props} user={this.state.user} />}
            />
            <Route path="/rentals" component={Rentals} />
            <Route path="/sellers" component={Seller} />
            <Route path="/not-found" component={NotFound} />
            <Route path="/" exact component={Movies} />
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </div>
    );
  }
}

export default App;
