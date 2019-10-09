import axios from 'axios';
import { outbound, inbound } from 'utils/interceptors';

const api = axios.create({
  baseURL: 'http://localhost:3333',
});

api.interceptors.request.use(request => outbound(request));

api.interceptors.response.use(response => inbound(response));

export default api;
