import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import { NavBar } from 'antd-mobile';
import 'antd-mobile/dist/antd-mobile.css';
import NavLinkBar from '../navlink/navlink';
import Boss from '../../component/boss/boss';
import Genius from '../../component/genius/genius';
import Msg from '../../component/msg/msg';
import User from '../../component/user/user';
import { getMsgList, recvMsg } from '../../redux/chat.redux';
import QueueAnim from 'rc-queue-anim';


const Dashboard = (props) => {
    const { pathname } = props.location;
    const user = props.user;
    const navList = [{
        path: '/boss',
        text: '牛人',
        icon: 'boss',
        title: '牛人列表',
        component: Boss,
        hide: user.type === 'genius'
    }, {
        path: '/genius',
        text: 'boss',
        icon: 'job',
        title: 'BOSS列表',
        component: Genius,
        hide: user.type === 'boss'
    }, {
        path: '/msg',
        text: '消息',
        icon: 'msg',
        title: '消息列表',
        component: Msg
    }, {
        path: '/me',
        text: '我',
        icon: 'user',
        title: '个人中心',
        component: User
    }];
    const page = navList.find(v => v.path = pathname);

    useEffect(() => {
        if (!props.chat.chatmsg.length) {
            props.getMsgList();
            props.recvMsg();
        }
    }, [props])

    //让动画生效，只渲染一个Route，根据当前的path决定组件
    return (
        <>
            <NavBar className='fixd-header' mode='dard'>{page.title}</NavBar>
            <div>
                <QueueAnim type='scaleX' duration={800}>
                    <Route key={page.path} path={page.path} component={page.component} />
                </QueueAnim>
            </div>
            <NavLinkBar data={navList}></NavLinkBar>
        </> 

    );
};

export default connect(s => s, { getMsgList, recvMsg })(Dashboard);  //生成器