const homegraph = require('./homegraph');
const print = require('./print');
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

if (!INPUT.agentUserId) {
  print.error(`\
Agent user Id missing from arguments.  
  homegraph-inspect <serviceAccountKeyFile> <agentUserId>\
`);
  return;
}

const getStateFromId = async () => {
  const spinner = ora({ text: 'Loading states...', spinner: 'pong' }).start();

  try {
    const homegraphInstance = homegraph.createInstance(CREDENTIALS);
    const devices = await homegraph.getDevices(
      homegraphInstance,
      INPUT.agentUserId
    );
    const states = await homegraph.getStateOfDevices(
      homegraphInstance,
      INPUT.agentUserId,
      devices
    );

    spinner.stop();

    print.title('Input');
    print.json(INPUT);

    print.title('Metadata');
    print.json(devices);

    print.title('State');
    print.json(states);
  } catch (err) {
    spinner.stop();

    print.title('Input');
    print.json(INPUT);
    print.error(err.message);
  }
};

getStateFromId();
