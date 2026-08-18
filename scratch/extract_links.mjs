import fs from 'fs';
const appData = process.env.USERPROFILE + '/.gemini/antigravity/brain/a84195d8-ba36-4b8e-ac3b-bdb068494b11/.system_generated/logs/transcript_full.jsonl';
const transcript = fs.readFileSync(appData, 'utf8');
const lines = transcript.trim().split('\n');
let out = 'No matches';
for (let i = lines.length - 1; i >= 0; i--) {
  if (!lines[i]) continue;
  const msg = JSON.parse(lines[i]);
  if (msg.type === 'USER_INPUT') {
    const content = msg.content;
    const regex = /href="\/monument\/([^"]+)"/g;
    let match;
    const links = new Set();
    while ((match = regex.exec(content)) !== null) {
      links.add(match[1]);
    }
    if (links.size > 0) {
      const sorted = Array.from(links).sort();
      out = 'Found ' + sorted.length + ' unique links:\n' + sorted.join('\n');
      break;
    }
  }
}
fs.writeFileSync('scratch/output.txt', out);
