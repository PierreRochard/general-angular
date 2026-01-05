/* eslint-disable no-console */
const { execFileSync, spawn } = require('child_process');
const http = require('http');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const DIST_DIR = path.join(ROOT, 'dist', 'postgrest-angular');
const PORT = Number(process.env.PORT || '4200');
const NPM_CMD = process.platform === 'win32'
  ? path.join(process.env['ProgramFiles'] || 'C:\\Program Files', 'nodejs', 'npm.cmd')
  : 'npm';

function waitForServer(urlToCheck, attempts = 40, delayMs = 500) {
  return new Promise((resolve, reject) => {
    let remaining = attempts;
    const check = () => {
      const req = http.get(urlToCheck, res => {
        res.resume();
        if (res.statusCode && res.statusCode >= 200 && res.statusCode < 500) {
          resolve();
        } else if (--remaining > 0) {
          setTimeout(check, delayMs);
        } else {
          reject(new Error(`Server not ready at ${url}`));
        }
      });
      req.on('error', () => {
        if (--remaining > 0) {
          setTimeout(check, delayMs);
        } else {
          reject(new Error(`Server not reachable at ${url}`));
        }
      });
    };
    check();
  });
}

function run(command, args, options = {}) {
  try {
    if (process.platform === 'win32') {
      execFileSync('cmd.exe', ['/c', command, ...args], { stdio: 'inherit', ...options });
    } else {
      execFileSync(command, args, { stdio: 'inherit', ...options });
    }
  } catch (err) {
    throw err;
  }
}

async function main() {
  await run(NPM_CMD, ['run', 'build', '--', '--configuration=production']);

  const httpServerBin = require.resolve('http-server/bin/http-server');
  const server = spawn(process.execPath, [httpServerBin, DIST_DIR, '-p', String(PORT), '-c-1', '-P', `http://localhost:${PORT}?`], {
    stdio: 'inherit',
  });

  try {
    await waitForServer(`http://localhost:${PORT}`);
    await run(process.execPath, [path.join(__dirname, 'run-cypress.js')], { env: { ...process.env, PORT: String(PORT) } });
  } finally {
    server.kill();
  }
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
