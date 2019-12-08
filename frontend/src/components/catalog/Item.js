import React from 'react';
import { Link } from 'react-router-dom';

import './Item.css'

export default ({ sport, label, img, streamId }) => {
    return (
        <Link to={`/stream/${streamId}`} style={{ textDecoration: 'none', color: 'white' }}>
            <div className="item">
                <div className="itemImg">
                    <img src={img} alt={label} />
                </div>
                <div className="description">
                    <div className="sport">
                        {sport}
                    </div>
                    <h3>
                        {label}
                    </h3>
                </div>
            </div>
        </Link>
    );
}