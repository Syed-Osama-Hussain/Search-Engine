import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Content from "./content";

class ContentList extends Component {
  state = {
    data: []
  };


  componentDidMount(){
    const data = [...this.props.data];
    this.setState({data});
  };

  handleClick = (content) => {
    this.setState({redirect:content});    
  }

  render() {
    const redirect = this.state.redirect;

    if(redirect) return (<Redirect push to={{ pathname:`/content/${redirect._id}`, state:{data:redirect}}}/>)

    return (
       this.state.data.map( content => (
        <div key={content._id}>
            <Content content={content} handleClick={this.handleClick}/>
            <br/>
        </div>
      ))
    
    );
  }
}

export default ContentList;