import fs from 'fs';
import path from 'path';
import { getImagePath } from '../src/lib/monumentsData.ts';
import { monumentsData } from '../src/lib/monumentsData.ts';

const PUBLIC_DIR = path.join(process.cwd(), 'public');

const allItems = new Set();
monumentsData.forEach(m => {
  m.utilities?.forEach(u => allItems.add(u.name));
  m.vehicles?.forEach(v => allItems.add(v.name));
  m.collectibles?.forEach(c => allItems.add(c.name));
  m.spawns?.forEach(s => allItems.add(s.name));
  m.puzzle?.bring?.forEach(b => allItems.add(b.name));
  m.puzzle?.activate?.forEach(a => allItems.add(a.name));
  m.puzzle?.rewards?.forEach(r => allItems.add(r.name));
  m.bpFrags?.forEach(b => allItems.add(b.name));
  m.advBp?.forEach(b => allItems.add(b.name));
});

console.log(`Checking ${allItems.size} unique items...`);

const missing = [];
for (const item of allItems) {
  const imgPath = getImagePath(item);
  if (!imgPath) {
    missing.push({ item, reason: 'getImagePath returned null' });
    continue;
  }
  
  const fullPath = path.join(PUBLIC_DIR, imgPath);
  if (!fs.existsSync(fullPath)) {
    missing.push({ item, path: imgPath, reason: 'File does not exist' });
  }
}

if (missing.length === 0) {
  console.log("All items mapped correctly!");
} else {
  console.log(`${missing.length} items have broken paths:`);
  missing.forEach(m => console.log(JSON.stringify(m)));
}
