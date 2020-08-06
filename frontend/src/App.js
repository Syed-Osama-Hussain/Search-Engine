import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import NavBar from "./components/navBar";
import SearchPage from "./components/searchPage";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import Logout from "./components/logout";
import NotFound from "./components/notFound";
import ContentDetail from "./components/contentDetail";
import ProtectedRoute from "./components/common/protectedRoute"
import UserHistory from "./components/history";
import auth from "./services/authService";
import "react-toastify/dist/ReactToastify.css";
import './App.css';




class App extends Component {
  state = {};

  componentDidMount(){
    const user = auth.getCurrentUser()
    this.setState({user});    
  }

  render() {
    const { user } = this.state;

    return (
    <React.Fragment> 
    <NavBar user={user}/>
    <main className="container">
      <Switch> 
        <Route path="/content/:id" component = {ContentDetail} />
        <ProtectedRoute path="/user/history" user={user} component = {UserHistory} />
        <Route path="/register" component={RegisterForm} />
        <Route path="/login" component={LoginForm} />
        <Route path="/logout" component={Logout} />
        <Route path="/not-found" component={NotFound} />
        <Route path="/" component={SearchPage} />
        <Redirect to="/not-found" />
      </Switch>
    </main>
    </React.Fragment>
    );
  }
}
export default App;