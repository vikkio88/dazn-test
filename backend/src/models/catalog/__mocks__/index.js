const items = [
    { sport: 'baseball', label: 'NYC vs Denver', 'img': 'https://vikkio.me/dazn/img/baseball.jpg', streamId: 'AXsu8222' },
    { sport: 'football', label: 'Broncos vs IDontKnow', 'img': 'https://vikkio.me/dazn/img/football.jpg', streamId: '37cx7fcvc' },
    { sport: 'soccer', label: 'Juventus vs Inter', 'img': 'https://vikkio.me/dazn/img/soccer.jpg', streamId: 'Int3RM3rd4' },
    { sport: 'csgo', label: 'Fnatic vs NIPJ', 'img': 'https://vikkio.me/dazn/img/csgo.jpg', streamId: '7cn8w22AA' },
];

const streams = {
    'AXsu8222': 'https://vikkio.me/dazn/video/sample.mp4',
    '7cn8w22AA': 'https://vikkio.me/dazn/video/sample.mp4',
    'Int3RM3rd4': 'https://vikkio.me/dazn/video/sample.mp4',
    '37cx7fcvc': 'https://vikkio.me/dazn/video/sample.mp4',
};

module.exports = {
    items,
    streams
};