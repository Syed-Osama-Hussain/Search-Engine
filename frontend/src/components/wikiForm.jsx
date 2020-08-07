import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { indexContent } from "../services/contentService";

class WikiForm extends Form {
  state = {
    data: { wikiUrl: ""},
    errors: {}
  };

  schema = {
    wikiUrl: Joi.string()
      .required()
      .label("Wiki Url")
  };

  doSubmit = async () => {
    const { data } = this.state;
    try{
      await indexContent(data.wikiUrl);
      data.wikiUrl = ""
      const { state } = this.props.location;

      window.location = state ? state.from.pathname : "/";

    }catch(ex){
      if(ex.response && (ex.response.status === 404 || ex.response.status === 400)){
        const errors = { ...this.state.errors }
        errors.wikiUrl = ex.response.data;
        this.setState({errors});
      }
    }
  };

  render() {
    return (
      <div className="container mt-4" id="mainContainer">
            <h1 className="headingText">Wiki Form</h1>
            <form onSubmit={this.handleSubmit}>
            {this.renderInput("wikiUrl", "")}
            {this.renderButton("Submit")}
            </form>
      </div>
    );
  }
}

export default WikiForm;