import fs from 'fs';
import path from 'path';
import { monumentsData } from '../src/lib/monumentsData.ts';

const PUBLIC_DIR = path.join(process.cwd(), 'public');
const RECYCLE_DIR = path.join(PUBLIC_DIR, 'images', 'recycle');
const IMAGES_DIR = path.join(PUBLIC_DIR, 'images');

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

// Helper to get all files
function getAllFiles(dir, fileList = []) {
  if (!fs.existsSync(dir)) return fileList;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      if (!filePath.includes('items')) { // ignore items folder since we made it
        getAllFiles(filePath, fileList);
      }
    } else {
      fileList.push(filePath);
    }
  }
  return fileList;
}

const allFiles = getAllFiles(IMAGES_DIR);

function findBestMatch(itemName) {
  const cleanName = itemName.replace(/\s*x\d+$/, '').toLowerCase();
  
  // Custom manual mappings for tricky ones
  const manualMap = {
    'advanced blueprint fragment': 'advancedblueprintfragment.webp',
    'blueprint fragments': 'basicblueprintfragment.webp', // or advanced
    'diesel fuel': 'diesel_barrel',
    'bike': 'motorbike',
    'stone node': 'stone.ore.png',
    'military crate': 'crate_normal.png',
    'normal crate': 'crate_normal_2.png',
    'basic crate': 'crate_basic.png',
    'elite crate': 'crate_elite.png',
    'loot barrel': 'loot_barrel_1.png',
    'pump jack': 'mining.pumpjack.webp',
    'patrol boat': 'rhib.png'
  };

  const manualMatch = manualMap[cleanName];
  
  const searchStrs = [
    cleanName.replace(/[^a-z0-9]+/g, ''), // e.g. workbenchlevel1
    cleanName.replace(/[^a-z0-9]+/g, '.'), // e.g. workbench.level.1
    cleanName.replace(/[^a-z0-9]+/g, '_'), // e.g. workbench_level_1
    cleanName.replace(' level ', ''), // e.g. workbench1
    manualMatch ? manualMatch.split('.')[0] : null
  ].filter(Boolean);

  for (const searchStr of searchStrs) {
    const match = allFiles.find(f => {
      const basename = path.basename(f).toLowerCase();
      return basename === `${searchStr}.webp` || 
             basename === `${searchStr}.png` ||
             (manualMatch && basename === manualMatch.toLowerCase());
    });
    
    if (match) {
      return match.replace(PUBLIC_DIR, '').replace(/\\/g, '/');
    }
  }
  
  // if not found exactly, try partial match
  const match = allFiles.find(f => {
     const basename = path.basename(f).toLowerCase();
     return basename.includes(searchStrs[3]) || basename.includes(searchStrs[0]);
  });
  if (match) {
    return match.replace(PUBLIC_DIR, '').replace(/\\/g, '/');
  }

  return null;
}

const finalMap = {};
for (const item of allItems) {
  const cleanName = item.replace(/\s*x\d+$/, '').toLowerCase();
  const match = findBestMatch(item);
  finalMap[cleanName] = match;
}

console.log("export const IMAGE_MAP: Record<string, string | null> = {");
for (const [key, val] of Object.entries(finalMap)) {
  console.log(`  '${key}': ${val ? `'${val}'` : 'null'},`);
}
console.log("};");
