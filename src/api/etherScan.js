import axios from 'axios';

import getEnvVars from '../../environment';
const env = getEnvVars();


export default axios.create({
  baseURL: env.etherscanUrl
});
