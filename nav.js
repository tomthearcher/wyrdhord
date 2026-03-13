const _WYRDHORD_APPS = [
    'ablawung', 'afindan', 'bloma', 'bryne', 'ceorf', 'druh',
    'freosan', 'gimcynn', 'ginung', 'gleobeam', 'hearg', 'hlof',
    'hrinan', 'hrisian', 'mynd', 'organistre', 'sceacel', 'sceo',
    'tocnyssan', 'wudubora'
];

function goToMenu() {
    window.location.href = '../index.html';
}

function goToRandom() {
    let next;
    do {
        next = _WYRDHORD_APPS[Math.floor(Math.random() * _WYRDHORD_APPS.length)];
    } while (window.location.href.includes('/' + next + '/'));
    window.location.href = '../' + next + '/';
}
