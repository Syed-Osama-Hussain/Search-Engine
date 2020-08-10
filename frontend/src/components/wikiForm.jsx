import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import auth from "../services/authService";
import { Redirect } from "react-router-dom";
import { indexContent } from "../services/contentService";
import Loader from 'react-loader-spinner';

class WikiForm extends Form {
  state = {
    data: { wikiUrl: ""},
    errors: {},
    loading: false
  };

  schema = {
    wikiUrl: Joi.string()
      .required()
      .label("Wiki Url")
  };

  componentDidMount(){
    const user = auth.getCurrentUser();
    this.setState({user:user})
  }

  doSubmit = () => {
    const { data } = this.state;
    this.setState({loading:true}, async () => {
      try{
        await indexContent(data.wikiUrl);
        data.wikiUrl = ""
        const { state } = this.props.location;
        this.setState({loading:false})
        window.location = state ? state.from.pathname : "/";
  
      }catch(ex){
        if(ex.response && (ex.response.status === 404 || ex.response.status === 400)){
          const errors = { ...this.state.errors }
          errors.wikiUrl = ex.response.data;
          this.setState({errors,loading:false});
        }
      }
    });

  };

  render() {
     if(this.state.user && !this.state.user.isAdmin) return <Redirect to="/login"/>

     if(this.state.loading){  
       return (<div
         style={{
           width: "100%",
           height: "100",
           display: "flex",
           justifyContent: "center",
           alignItems: "center"
         }}
       >
         <Loader type="ThreeDots" color="#2BAD60" height="100" width="100" />
       </div>)
     }
    return (
      <div className="container mt-4" id="mainContainer">
            <h1 className="headingText"><span id="findColor">Wiki</span> <span id="myColor">Form</span></h1>
            <form className="form-height" onSubmit={this.handleSubmit}>
            {this.renderInput("wikiUrl", "", "Enter your Wiki URL")}
            {this.renderButton("Submit")}
            </form>
      </div>
    );
  }
}

export default WikiForm;