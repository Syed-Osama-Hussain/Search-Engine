import  React from "react";

const Content = ({content, handleClick }) => {

    return (
        <div style={{"cursor": "pointer"}} onClick = {() => handleClick(content)} >
            <h1 className="title">{content.title}</h1> 
            <h4>{content.heading}</h4>
            <p style={{"color": "#4d5156"}}>{content.content.substr(0,40)}...</p>
        </div>
    );
}

export default Content;