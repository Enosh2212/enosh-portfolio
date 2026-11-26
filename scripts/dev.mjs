import { createServer } from 'node:http';
import { parseArgs } from 'node:util';
import next from 'next';

const { values } = parseArgs({
  options: { port: { type: 'string', default: '3107' } },
});
const port = Number(values.port);
if (!Number.isInteger(port) || port < 1 || port > 65535) {
  throw new Error('Choose a port between 1 and 65535.');
}

const hostname = '127.0.0.1';
const app = next({ dev: true, webpack: true, dir: process.cwd(), hostname, port });
await app.prepare();
createServer(app.getRequestHandler()).listen(port, hostname, () => {
  console.log(`Archive ready at http://localhost:${port}`);
});
