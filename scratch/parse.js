const fs = require('fs');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const html = fs.readFileSync('monuments.html', 'utf8');
const dom = new JSDOM(html);
const document = dom.window.document;

const rows = document.querySelectorAll('.rs-monument-table tbody tr');

const parseCards = (td) => {
    if (td.textContent.trim() === 'N/A') return [];
    const res = [];
    td.querySelectorAll('span[title]').forEach(span => {
        let name = span.getAttribute('title').trim();
        let type = '';
        if (name.includes('green keycard')) type = 'green';
        if (name.includes('blue keycard')) type = 'blue';
        if (name.includes('red keycard')) type = 'red';
        
        let logic = '';
        const iTag = span.nextElementSibling;
        if (iTag && iTag.tagName === 'I') {
           logic = iTag.textContent.trim();
        }
        res.push({ type, name, logic });
    });
    return res;
};

const parseIcons = (td) => {
    if (td.textContent.trim() === 'N/A') return [];
    const res = [];
    td.querySelectorAll('span[title]').forEach(span => {
        let name = span.getAttribute('title').trim();
        let count = 1;
        const bTag = span.querySelector('b');
        if (bTag) {
            count = parseInt(bTag.textContent.replace('x', ''), 10);
        }
        res.push({ name, count });
    });
    return res;
};

const monuments = [];

rows.forEach(row => {
    const th = row.querySelector('th');
    const num = th.querySelector('span').textContent.trim();
    const name = th.querySelector('div strong').textContent.trim();
    
    const subtitle = th.querySelector('small');
    
    const tds = row.querySelectorAll('td');
    
    const tier = tds[0].textContent.trim();
    const cardsNeeded = parseCards(tds[1]);
    const cardsFound = parseCards(tds[2]);
    const utilities = parseIcons(tds[3]);
    const vehicles = parseIcons(tds[4]);
    
    let cctv = tds[5].textContent.trim();
    let cctvLink = '';
    if (cctv !== 'N/A') {
        const link = tds[5].querySelector('a');
        if (link) cctvLink = link.getAttribute('href');
    }
    
    const bpFrags = parseIcons(tds[6]);
    const advBp = parseIcons(tds[7]);
    
    let guide = tds[8].textContent.trim();
    let guideLink = '';
    if (guide !== 'N/A') {
        const link = tds[8].querySelector('a');
        if (link) guideLink = link.getAttribute('href');
    }
    
    monuments.push({
        id: num,
        name: name,
        subtitle: subtitle ? subtitle.textContent.trim() : null,
        tier,
        cardsNeeded,
        cardsFound,
        utilities,
        vehicles,
        cctv: cctvLink,
        bpFrags,
        advBp,
        guide: guideLink
    });
});

fs.writeFileSync('monuments.json', JSON.stringify(monuments, null, 2));
console.log('Parsed', monuments.length, 'monuments');
