const http = require('http');
const fs = require('fs');
const path = require('path');

const PUBLIC_DIR = __dirname;
const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(__dirname, 'mejas.txt');

function getContentType(filePath) {
  if (filePath.endsWith('.html')) return 'text/html; charset=utf-8';
  if (filePath.endsWith('.js')) return 'application/javascript; charset=utf-8';
  if (filePath.endsWith('.css')) return 'text/css; charset=utf-8';
  if (filePath.endsWith('.json')) return 'application/json; charset=utf-8';
  if (filePath.endsWith('.txt')) return 'text/plain; charset=utf-8';
  return 'application/octet-stream';
}

const server = http.createServer((req, res) => {
  // Basic CORS + preflight handling to make fetch work from same origin
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    return res.end();
  }

  if (req.method === 'POST' && req.url === '/save-message') {
    let body = '';
    req.on('data', chunk => { body += chunk.toString(); });
    req.on('end', () => {
      try {
        const data = JSON.parse(body);
        const name = String(data.name || '').trim();
        const email = String(data.email || '').trim();
        const message = String(data.message || '').trim();

        if (!name || !email || !message) {
          res.writeHead(400, {'Content-Type': 'application/json'});
          return res.end(JSON.stringify({ ok: false, error: 'Eksik alan' }));
        }

        const timestamp = new Date().toISOString();
        const entry = `---\nZaman: ${timestamp}\nAd: ${name}\nE-posta: ${email}\nMesaj:\n${message}\n`;

        fs.appendFile(DATA_FILE, entry + '\n', err => {
          if (err) {
            res.writeHead(500, {'Content-Type': 'application/json'});
            return res.end(JSON.stringify({ ok: false, error: 'Dosyaya yazılamadı' }));
          }
          res.writeHead(200, {'Content-Type': 'application/json'});
          res.end(JSON.stringify({ ok: true }));
        });
      } catch (e) {
        res.writeHead(400, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({ ok: false, error: 'Geçersiz JSON' }));
      }
    });
    return;
  }

  // Serve static files from the project directory
  let urlPath = req.url.split('?')[0];
  if (urlPath === '/') urlPath = '/index.html';
  const filePath = path.join(PUBLIC_DIR, decodeURIComponent(urlPath));

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, {'Content-Type': 'text/plain; charset=utf-8'});
      return res.end('Not found');
    }
    const stream = fs.createReadStream(filePath);
    res.writeHead(200, {'Content-Type': getContentType(filePath)});
    stream.pipe(res);
  });
});

server.listen(PORT, () => {
  console.log(`Sunucu çalışıyor: http://localhost:${PORT}`);
});
