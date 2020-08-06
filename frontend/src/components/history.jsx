import React, { Component } from "react";
import { getUserHistory } from "../services/userService";

class UserHistory extends Component {
  state = {
    history: []
  };


  async componentDidMount(){
    const user = {...this.props.user};
    
    if(user._id)
    {    
        const {data} = await getUserHistory(user._id);
    
        this.setState({history:data});
    }
};


  render() {
    const {history} = this.state;

    return(         

    <div>
        { history &&  <ul>
        {history.map(his => <div key={his._id}>
            <h1> {his.title} </h1>
            <a href={`content/${his._id}`}>{his.heading_url}</a>            
            </div>)}
        </ul> }
    </div>
    );
  }
}

export default UserHistory;