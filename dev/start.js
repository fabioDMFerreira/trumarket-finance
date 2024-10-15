const chokidar = require('chokidar');
const { exec } = require('child_process');
const net = require('net');

process.chdir('..');
console.log('Changed working directory to parent directory');

const checkServer = (port, callback) => {
  const client = new net.Socket();
  client.once('error', () => {
    callback(false);
  });
  client.once('connect', () => {
    client.end();
    callback(true);
  });
  client.connect(port, '127.0.0.1');
};

checkServer(63035, (isRunning) => {
  if (!isRunning) {
    exec('dfx start --background', (error, stdout, stderr) => {
      if (error) {
        console.error(`dfx start process exited with error: ${error.message}`);
        return;
      }
      if (stderr) {
        console.error(`dfx start stderr: ${stderr}`);
        return;
      }
      console.log(`dfx start stdout: ${stdout}`);
      console.log('dfx started in background');
      console.log(
        'Dfx dashboard available at http://localhost:63035/_/dashboard'
      );
    });
  } else {
    console.log(
      'Dfx dashboard available at http://localhost:63035/_/dashboard'
    );
  }
});

const watcher = chokidar.watch('./src/trumarket-icp-app-backend/src', {
  ignored: /(^|[\/\\])\../,
  persistent: true,
});

let deployProcess = null;

watcher.on('change', (path) => {
  console.log(`File ${path} has been changed`);

  if (deployProcess) {
    deployProcess.kill();
    console.log('Previous deploy process killed');
  }

  deployProcess = exec('dfx deploy', (error, stdout, stderr) => {
    if (error) {
      console.error(`dfx deploy process exited with error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`dfx deploy stderr: ${stderr}`);
      return;
    }
    console.log(`dfx deploy stdout: ${stdout}`);
  });
});

console.log('Watching for changes in src directory');

exec('dfx deploy', (error, stdout, stderr) => {
  if (error) {
    console.error(`dfx deploy process exited with error: ${error.message}`);
    return;
  }
  if (stderr) {
    console.error(`dfx deploy stderr: ${stderr}`);
    return;
  }
  console.log(`dfx deploy stdout: ${stdout}`);
});

console.log('Deploying canisters');

process.on('SIGINT', () => {
  console.log('SIGINT signal received: closing watcher');
  watcher.close().then(() => {
    console.log('Watcher closed');
    process.exit(0);
  });
});

process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing watcher');
  watcher.close().then(() => {
    console.log('Watcher closed');
    process.exit(0);
  });
});
