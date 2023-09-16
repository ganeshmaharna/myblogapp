import axios from "axios";
const client = axios.create({ 
    baseURL: "http://192.168.171.57:7000/" 
});


export default client;
