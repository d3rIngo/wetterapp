const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000; // Definiere den Port, auf dem der Server lauschen soll

// Erstelle den HTTP-Server
const server = http.createServer((req, res) => {
  let filePath = '.' + req.url;
  if (filePath === './') {
    filePath = './public/index.html'; // Verweis auf die index.html-Datei im public-Verzeichnis
  }

  const extname = path.extname(filePath);
  let contentType = 'text/html'; // Standardinhaltstyp

  // Bestimme den Inhaltstyp basierend auf der Dateiendung
  switch (extname) {
    case '.js':
      contentType = 'text/javascript';
      break;
    case '.css':
      contentType = 'text/css';
      break;
  }

  // Lese die Datei aus dem Dateisystem und sende sie als Antwort
  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        // Seite nicht gefunden
        fs.readFile('./public/404.html', (err, content) => {
          res.writeHead(404, { 'Content-Type': 'text/html' });
          res.end(content, 'utf-8');
        });
      } else {
        // Interner Serverfehler
        res.writeHead(500);
        res.end('Interner Serverfehler: ' + err.code);
      }
    } else {
      // Erfolgreiche Antwort
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

// Server starten
server.listen(PORT, () => {
  console.log(`Server läuft auf http://localhost:${PORT}`);
});
