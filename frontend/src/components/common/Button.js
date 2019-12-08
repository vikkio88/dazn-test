import React from 'react';
import './Button.css';

export default ({ onClick = () => { }, label }) => (
    <button className="button" onClick={() => onClick()}>
        {label}
    </button>
)