const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');
const timestamp = Date.now();
html = html.replace(/href="style\.css\?v=[0-9]+"/g, 'href="style.css?v=' + timestamp + '"');
html = html.replace(/src="script\.js\?v=[0-9]+"/g, 'src="script.js?v=' + timestamp + '"');
if (!html.includes('script.js?v=')) { 
  html = html.replace(/<script src="script\.js"><\/script>/g, '<script src="script.js?v=' + timestamp + '"><\/script>'); 
}
fs.writeFileSync('index.html', html);
console.log('Cache busters updated:', timestamp);
