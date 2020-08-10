import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import ContentList from "./contentList";
import { getSearchContent } from "../services/contentService";
import Loader from 'react-loader-spinner';

class SearchPage extends Form {
  state = {
    data: { query: ""},
    errors: {},
    content: [],
    loading: false
  };

  schema = {
    query: Joi.string()
      .required()
      .label("Query")
  };

  doSubmit = () => {
    const { data } = this.state;
    this.setState({loading:true}, async () => {
      try{
        const content = await getSearchContent(data.query);
        data.query = ""
        this.setState({content:[...content.data],data,loading:false})
  
      }catch(ex){
        if(ex.response && ex.response.status === 404){
          const errors = { ...this.state.errors }
          errors.query = ex.response.data;
          this.setState({errors,loading:false});
        }
      }
    })

  };

  render() {
    const {content} = this.state;
    if(this.state.loading){  
      return (<div
        style={{
          width: "100%",
          height: "100",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "100px"
        }}
      >
        <Loader type="ThreeDots" color="#2BAD60" height="100" width="100" />
      </div>)
    }
    return (
      <div className="container mt-4" id="mainContainer">
        <div >
            <h1 className="mainHeading"><span id="findColor">Find</span><span id="myColor">My</span><span id="wikiColor">Wiki</span></h1>
            <form className="form-height" onSubmit={this.handleSubmit}>
            {this.renderInput("query", "","Enter Query Here")}
            {this.renderButton("Search")}
            </form>
        </div>
        <br/>
        {content.length !== 0 && <ContentList data={[...content]}/>}
      </div>
    );
  }
}

export default SearchPage;