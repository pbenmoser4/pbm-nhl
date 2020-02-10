import axios from 'axios';

export default axios.create({
  baseURL: 'https://statsapi.web.nhl.com/api/v1'
});
