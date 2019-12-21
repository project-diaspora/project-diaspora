import axios from 'axios';

import getEnvVars from '../../environment';
const env = getEnvVars();


const api = axios.create({
  baseURL: env.apiUrl
});

export default {
  checkUsername: async (username) => {
    const res = await api.get(`/users?username=${username}`)
    return res.data[0] || null
  }
}
