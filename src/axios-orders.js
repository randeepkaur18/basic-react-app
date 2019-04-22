import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://burger-react-app-7e310.firebaseio.com/'
});

export default axiosInstance;