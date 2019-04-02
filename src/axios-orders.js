import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://react-my-burger.firebaseio.com/'
});

export default axiosInstance;