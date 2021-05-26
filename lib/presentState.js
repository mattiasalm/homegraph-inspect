const homegraph = require('./homegraph');
const print = require('./print');

const fromId = async (credentials, input) => {
  try {
    const homegraphInstance = homegraph.createInstance(credentials);
    const devices = await homegraph.getDevices(
      homegraphInstance,
      input.agentUserId
    );
    const states = await homegraph.getStateOfDevices(
      homegraphInstance,
      input.agentUserId,
      devices
    );

    print.title('Input');
    print.json(input);

    print.title('Metadata');
    print.json(devices);

    print.title('State');
    print.json(states);
  } catch (err) {
    print.title('Input');
    print.json(input);
    print.error(err.message);
  }
};

module.exports = {
  fromId,
};
