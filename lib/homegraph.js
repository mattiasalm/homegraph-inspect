const { auth, homegraph } = require('@googleapis/homegraph');

const getGoogleAuth = (credentials) =>
  new auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/homegraph'],
  });

const createHomegraphInstance = (credentials) =>
  homegraph({
    version: 'v1',
    auth: getGoogleAuth(credentials),
  });

const getDevices = (homegraphInstance, agentUserId) =>
  homegraphInstance.devices
    .sync({
      requestBody: {
        agentUserId,
      },
    })
    .then((response) => response.data.payload.devices)
    .catch((err) => {
      if (err.response.status === 404) {
        throw new Error('Agent user Id not found in Homegraph');
      }

      throw new Error(err);
    });

const getStateOfDevices = (homegraphInstance, agentUserId, devices) =>
  homegraphInstance.devices
    .query({
      requestBody: {
        agentUserId,
        inputs: [
          {
            payload: {
              devices: devices.map((device) => ({ id: device.id })),
            },
          },
        ],
      },
    })
    .then((response) => response.data.payload)
    .catch((err) => {
      console.log(err);
      throw new Error(err);
    });

module.exports = {
  createInstance: createHomegraphInstance,
  getDevices,
  getStateOfDevices,
};
