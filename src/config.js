import Axios from 'axios';
import { Toast } from 'antd-mobile';


//拦截请求
// Axios.interceptors.request.use((config) => {
//     Toast.loading('加载中', 0);
//     return config;
// });

//拦截相应
Axios.interceptors.request.use((config) => {
    Toast.hide();
    return config;
});