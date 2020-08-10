import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import * as userService from "../services/userService";
import auth from "../services/authService";

class RegisterForm extends Form {
  state = {
    data: { username: "", password: "", name: "" },
    errors: {}
  };

  schema = {
    username: Joi.string()
      .required()
      .email()
      .label("Email"),
    password: Joi.string()
      .required()
      .min(5)
      .label("Password"),
    name: Joi.string()
      .required()
      .label("Name")
  };

  doSubmit = async () => {
    try{
      const { headers } = await userService.register(this.state.data);
      auth.loginWithJwt(headers["x-auth-token"])
      window.location = "/";
    }catch(ex){
      if(ex.response && ex.response.status === 400){
        const errors = { ...this.state.errors }
        errors.username = ex.response.data;
        this.setState({errors});
      }
    }
  };

  render() {
    return (
      <div className="container mt-4" id="mainContainer">
        <h1 id="myColor" className="headingText">Register</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Email", "test@test.com")}
          {this.renderInput("password", "Password","12345","password")}
          {this.renderInput("name", "Name", "User")}
          {this.renderButton("Register")}
        </form>
      </div>
    );
  }
}

export default RegisterForm;
