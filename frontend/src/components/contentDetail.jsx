import React, { Component } from "react";
import { getContent } from "../services/contentService";

class ContentDetail extends Component {
  state = {
    content: {}
  };


  async componentDidMount(){
    const content = {...this.props.location.state.data};

    await getContent(content._id);
    this.setState({content});
  };


  render() {
    const {content} = this.state;

    return(         

    <div>
        <h1>{content.title}</h1> 
        <h4>{content.heading}</h4>
        <p>{content.content}</p>
        { content.tags &&  <ul>
        {content.tags.map(tag => <li key={tag}>{tag}</li>)}
        </ul> }
        <a href={content.heading_url}>{content.heading_url}</a>
    </div>
    );
  }
}

export default ContentDetail;