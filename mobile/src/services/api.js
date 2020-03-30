import axios from 'axios';

const api = axios.create({
    baseURL: 'http://192.168.1.112:3333', // pegar meu ipv4 da aba (Adaptador Ethernet Ethernet)
});

export default api;