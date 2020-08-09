import React, { Component } from "react";
import { getContent } from "../services/contentService";
import { toast } from "react-toastify";

class ContentDetail extends Component {
  state = {
    content: {},
    error: false
  };


  async componentDidMount(){
    let content;
    if(this.props.location.state)
    {
     content = {...this.props.location.state.data};
      try{
        await getContent(content._id);
      }catch(ex){
        if(ex.response && ex.response.status === 404 && ex.response.status === 400){

          this.setState({error:ex.response.data});
        }        
      }
      }else{
     content = this.props.location.pathname.split("/")[2]
     try{
      let {data} = await getContent(content);
      content = data;
      }catch(ex){
        if(ex.response && ex.response.status === 404){

          this.setState({error:ex.response.data});
        } 
     } 
    }

    this.setState({content});
  };


  render() {
    const {content} = this.state;
    
    if(this.state.error) toast.error(this.state.error);

    return(         
    <div className="container mt-4">
        <h1 style={{"fontWeight":"bold","color":"#609"}}>{content.title}</h1> 
        <h4>{content.heading}</h4>
        <p style={{"color": "#4d5156"}}>{content.content}</p>
        {content.heading_url && <a href={content.heading_url} className="btn btn-outline-success">View on Site</a>}
    </div>
    );
  }
}

export default ContentDetail;