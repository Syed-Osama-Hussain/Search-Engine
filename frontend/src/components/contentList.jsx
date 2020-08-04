import React, { Component } from "react";
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
    console.log(content, "clicked.");
  }

  render() {
    return (
       this.state.data.map( content => (
        <div key={content._id}>
            <Content content={content} handleClick={this.handleClick}/>
        </div>
      ))
    
    );
  }
}

export default ContentList;