import React from 'react';
import './Button.css';

export default ({ onClick = () => { }, label, accent = false }) => (
    <button className={`button${accent ? '-accent' : ''}`} onClick={() => onClick()}>
        {label}
    </button>
)