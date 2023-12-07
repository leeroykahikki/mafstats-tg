const Axios = require('axios');

const mafstats = Axios.create({
  baseURL: process.env.MAFSTATS_SERVER_LINK + 'api/',
});

const mafstatsFetch = async (route, params) => {
  let data;
  await mafstats.post(route, params).then((response) => (data = response.data));
  return data;
};

module.exports = {
  mafstatsFetch,
};
