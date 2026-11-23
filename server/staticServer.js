const http = require('http');
const fs = require('fs');
const path = require('path');
const mimeTypes = require('./mimeTypes');

function createStaticServer(rootDirectory) {
  return http.createServer((request, response) => {
    const pathname = decodeURIComponent(request.url.split('?')[0]);
    const relativePath = pathname === '/' ? 'index.html' : pathname.replace(/^\//, '');
    const filePath = path.join(rootDirectory, relativePath);

    if (!filePath.startsWith(rootDirectory)) {
      response.writeHead(403);
      response.end('Forbidden');
      return;
    }

    fs.readFile(filePath, (error, content) => {
      if (error) {
        const notFound = error.code === 'ENOENT';
        response.writeHead(notFound ? 404 : 500);
        response.end(notFound ? 'Nie znaleziono strony' : 'Błąd serwera');
        return;
      }

      const mimeType = mimeTypes[path.extname(filePath).toLowerCase()] || 'application/octet-stream';
      const contentType = mimeType.startsWith('text/')
        ? `${mimeType}; charset=utf-8`
        : mimeType;

      response.writeHead(200, { 'Content-Type': contentType });
      response.end(content);
    });
  });
}

module.exports = { createStaticServer };
