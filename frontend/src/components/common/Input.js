import React from 'react';

import './Input.css';


export default props => {
    const { type = "type" } = props;
    return <input type={type} className="textInput" {...props} />
}