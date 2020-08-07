import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import auth from "../services/authService";
import { getUserHistory } from "../services/userService";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";

class UserHistory extends Component {
  state = {
    history: [],
    currentPage: 1,
    pageSize: 4
  };


  async componentDidMount(){
    const user = auth.getCurrentUser();
    
    if(user._id)
    {    
        const {data} = await getUserHistory(user._id);
    
        this.setState({history:data,user:user});
    }
  };

  handleClick = (historyContent) => {
    this.setState({redirectTo:historyContent});
  }

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };


  render() {
    const {history, redirectTo, user, currentPage, pageSize} = this.state;

    const data = paginate(history, currentPage, pageSize);

    if(redirectTo) return (<Redirect push to={{ pathname:`/content/${redirectTo._id}`, state:{data:redirectTo}}}/>)

    return(         

    <div>
      {user && <h1 className="mb-3">History for {this.state.user.name}</h1>}
        { history &&  <ul >
        {history.map(his => <div className="mb-5 card col-lg-4" key={his._id + Math.random()}>
            <h5 className="mb-2"> {his.title} </h5>
            <button className="btn btn-primary col-6 mb-2" onClick={() => this.handleClick(his)}>View Page</button>                        
            </div>)}
        </ul> }
        <Pagination
            itemsCount={data.length}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
    </div>
    );
  }
}

export default UserHistory;