import axios from "axios";

const axiosPrivate = axios.create({
    baseURL: import.meta.env.VITE_api_url
})
const useAxiosPrivate = () => {
    axiosPrivate.interceptors.request.use(function (config) {
        const token = localStorage.getItem("token");
        config.headers.authorization = token ? `Bearer ${token}` : "";
        return config;
    }, function (error) {
        // Do something with request error
        return Promise.reject(error);
    });

    axiosPrivate.interceptors.response.use((response) => {
        return response;
    }, async (error) => {
        // console.log(error);
        if (error.response?.status === 401 || error.response?.status === 403) {
            localStorage.removeItem("token");
        }
        return Promise.reject(error)
    })
    return axiosPrivate;
}
export default useAxiosPrivate;