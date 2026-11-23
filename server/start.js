const path = require('path');
const { createStaticServer } = require('./staticServer');

const projectRoot = path.resolve(__dirname, '..');
const port = Number(process.argv[2] || 5500);
const server = createStaticServer(projectRoot);

server.listen(port, '127.0.0.1', () => {
  console.log(`Strona działa: http://127.0.0.1:${port}`);
});
