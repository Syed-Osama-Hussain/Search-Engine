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

    <div className="container mt-4">
      {user && <h1 className="mb-3">History for {this.state.user.name}</h1>}
        { history &&  <ul >
        {data.map(his => <div className="mb-5 col-lg-4" key={his._id + Math.random()}>
            <div className="card">
            <div className="card-header">
              {his.title}
            </div>
            <div className="card-body">
            <h5 className="card-title"> {his.heading} </h5>
            {/* eslint-disable-next-line */}
            <a href="#" className="btn btn-primary card-link" onClick={() => this.handleClick(his)}>View Page</a>                        </div>
            </div>
            </div>)}
        </ul> }
        { history && 
        <Pagination
            itemsCount={history.length}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        }
    </div>
    );
  }
}

export default UserHistory;