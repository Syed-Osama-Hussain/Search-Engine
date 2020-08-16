import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Content from "./content";
import Pagination from "react-js-pagination";
import { paginate } from "../utils/paginate";


class ContentList extends Component {
  state = {

    currentPage: 1,
    pageSize: 4
  };


  handleClick = (content) => {
    this.setState({redirect:content});    
  }


  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  render() {
    const data = this.props.data;

    const {redirect, currentPage, pageSize} = this.state;

    let finalData = paginate(data, currentPage, pageSize);

    if(redirect) return (<Redirect push to={{ pathname:`/content/${redirect._id}`, state:{data:redirect}}}/>)

    return (
      <div> 
      {finalData.map( content => (
        <div key={content._id}>
            <Content content={content} handleClick={this.handleClick}/>
            <br/>
        </div>
      ))}
      <Pagination
      totalItemsCount={data.length}
      itemsCountPerPage={pageSize}
      pageRangeDisplayed={5}
      activePage={currentPage}
      onChange={this.handlePageChange}
      itemClass="page-item"
      linkClass="page-link"
    />
  </div>
    
    );
  }
}

export default ContentList;