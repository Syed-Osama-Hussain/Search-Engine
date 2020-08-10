import React from "react";
import Joi from "joi-browser";
import { Redirect } from "react-router-dom";
import Form from "./common/form";
import auth from "../services/authService";

class LoginForm extends Form {
  state = {
    data: { email: "", password: "" },
    errors: {}
  };

  schema = {
    email: Joi.string()
      .required()
      .label("Email"),
    password: Joi.string()
      .required()
      .label("Password")
  };

  doSubmit = async () => {
    const { data } = this.state;
    try{
      await auth.login(data.email, data.password);
      const { state } = this.props.location;

      window.location = state ? state.from.pathname : "/";
    }catch(ex){
      if(ex.response && ex.response.status === 400){
        const errors = { ...this.state.errors }
        errors.email = ex.response.data;
        this.setState({errors});
      }
    }
  };

  render() {
    if(auth.getCurrentUser()) return <Redirect to="/" />
    const style = {'align':'center'}
    return (
      <div className="container mt-4" id="mainContainer">
        <h1 id="findColor" className="headingText">Login</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("email", "Email", "test@test.com")}
          {this.renderInput("password", "Password","12345" ,"password")}
          {this.renderButton("Login",style)}
        </form>
      </div>
    );
  }
}

export default LoginForm;
