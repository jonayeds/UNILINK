import axios from 'axios'

export const axiosSecure = axios.create({
    baseURL: 'https://unilink-server-lilac.vercel.app'
})
const useAxiosSecure = () => {
    return axiosSecure
};

export default useAxiosSecure;

// https://unilink-server-lilac.vercel.app