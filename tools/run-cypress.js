const { spawn } = require('child_process');
const path = require('path');

const env = { ...process.env };
delete env.ELECTRON_RUN_AS_NODE;

const pkgPath = require.resolve('cypress/package.json');
// Cypress exports don't expose the CLI path, so derive it from the package metadata.
const cypressBin = require(pkgPath).bin.cypress || require(pkgPath).bin;
const cypressCli = path.join(path.dirname(pkgPath), cypressBin);

const child = spawn(process.execPath, [cypressCli, 'run'], {
  env,
  stdio: 'inherit'
});

child.on('exit', (code) => process.exit(code));

child.on('error', (err) => {
  console.error('Failed to start Cypress:', err);
  process.exit(1);
});
