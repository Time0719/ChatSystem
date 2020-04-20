import { useEffect } from 'react';
import Axios from 'axios';
import { withRouter } from 'react-router-dom';
import { loadData } from '../../redux/user.redux';
import { connect } from 'react-redux';


const AuthRoute = (props) => {

    const getUserInfo = () => {
        //获取用户信息
        Axios.get('user/info').then(res => {
            if (res.status === 200) {
                if (res.data.code === 0) {
                    //有登录信息
                    props.loadData(res.data.data);
                } else {
                    props.history.push('/login');
                }
            }
        });
        //是否登录

        //用户的type 身份是boss还是牛人
        //用户是否完善信息（选择头像 个人简介）
    };

    const isPathName = () => {
        const publicList = ['/login', '/register'];
        const pathname = props.location.pathname;
        if (publicList.indexOf(pathname) > -1) {
            return null;
        };
    };

    useEffect(() => {
        getUserInfo();
        isPathName();
    }, []);


    return null;
};

export default connect(null, { loadData })(withRouter(AuthRoute));