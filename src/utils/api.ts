import axios from 'axios';

const API = axios.create({
  baseURL: 'https://www.cbr-xml-daily.ru',
});

export default API;
