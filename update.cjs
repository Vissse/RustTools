const fs = require('fs');
let content = fs.readFileSync('src/components/guides/FarmingGuide.tsx', 'utf8');

// 1. Remove space-y-24 lg:space-y-32
content = content.replace(/<div className="space-y-24 lg:space-y-32">/g, '<div>');

// 2. Add Separator between Steps
// We find all <Step occurrences except the first one and prefix with <Separator />
let parts = content.split('<Step');
for (let i = 2; i < parts.length; i++) {
  parts[i] = '  <Separator />\n            <Step' + parts[i];
}
content = parts.join('');

// 3. Add Separator function if it doesn't exist
if (!content.includes('function Separator')) {
  content += '\n\nfunction Separator() {\n  return (\n    <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-24 lg:my-40" />\n  )\n}\n';
}

fs.writeFileSync('src/components/guides/FarmingGuide.tsx', content);
