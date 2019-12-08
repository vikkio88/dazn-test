import React from 'react';
import { Item } from 'components/catalog';

import './Dashboard.css';

const items = [
    { sport: 'baseball', label: 'NYC vs Denver', 'img': 'https://vikkio.me/dazn/img/baseball.jpg', streamId: 'AXsu8222' },
    { sport: 'football', label: 'Broncos vs IDontKnow', 'img': 'https://vikkio.me/dazn/img/football.jpg', streamId: '37cx7fcvc' },
    { sport: 'soccer', label: 'Juventus vs Inter', 'img': 'https://vikkio.me/dazn/img/soccer.jpg', streamId: 'Int3RM3rd4' },
    { sport: 'csgo', label: 'Fnatic vs NIPJ', 'img': 'https://vikkio.me/dazn/img/csgo.jpg', streamId: '7cn8w22AA' },
]

export default () => (
    <>
        <div className="catalog">
            {items.map(i => (
                <Item key={i.streamId} {...i} />
            ))}
        </div>
    </>
);