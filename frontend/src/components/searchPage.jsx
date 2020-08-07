import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import ContentList from "./contentList";
import { getSearchContent } from "../services/contentService";

class SearchPage extends Form {
  state = {
    data: { query: ""},
    errors: {},
    content: []
  };

  schema = {
    query: Joi.string()
      .required()
      .label("Query")
  };

  doSubmit = async () => {
    const { data } = this.state;
    try{
      const content = await getSearchContent(data.query);
      console.log(content.data)
      data.query = ""
      this.setState({content:content.data,data})

    }catch(ex){
      if(ex.response && ex.response.status === 404){
        const errors = { ...this.state.errors }
        errors.query = ex.response.data;
        this.setState({errors});
      }
    }
  };

  render() {
    const {content} = this.state;
    return (
      <div className="container mt-4" id="mainContainer">
        <div >
            <h1 className="headingText">FindMyWiki</h1>
            <form onSubmit={this.handleSubmit}>
            {this.renderInput("query", "")}
            {this.renderButton("Search")}
            </form>
        </div>
        <br/>
        {content.length !== 0 && <ContentList data={content}/>}
      </div>
    );
  }
}

export default SearchPage;