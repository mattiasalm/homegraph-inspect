const print = require('./print');
const presentState = require('./presentState');
const ora = require('ora');
const fs = require('fs');
const path = require('path');
const [, , ...args] = process.argv;

if (!args[0]) {
  print.error(`\
No arguments provided.  
  homegraph-inspect <serviceAccountKeyFile> <agentUserId>\
`);
  return;
}

if (!args[1]) {
  print.error(`\
Agent user Id missing from arguments.  
  homegraph-inspect <serviceAccountKeyFile> <agentUserId>\
`);
  return;
}

const SERVICE_ACCOUNT_KEY = path.resolve(__dirname, args[0]);

if (!fs.existsSync(SERVICE_ACCOUNT_KEY)) {
  print.error(`\
The provided Service Account Key is not found.  
  homegraph-inspect <serviceAccountKeyFile> <agentUserId>\
`);
  return;
}

const CREDENTIALS = require(SERVICE_ACCOUNT_KEY);

const INPUT = {
  agentUserId: args[1],
  projectId: CREDENTIALS.project_id,
};

const run = async () => {
  const spinner = ora({ text: 'Loading states...', spinner: 'pong' }).start();
  await presentState.fromId(CREDENTIALS, INPUT);
  spinner.stop();
};

run();
