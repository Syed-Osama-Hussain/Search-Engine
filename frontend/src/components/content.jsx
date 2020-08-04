import  React from "react";

const Content = ({content, handleClick }) => {

    return (
        <div onClick = {() => handleClick(content)} >
            <h1>{content.title}</h1> 
            <h4>{content.heading}</h4>
            <p>{content.content.substr(0,40)}...</p>
        </div>
    );
}

export default Content;