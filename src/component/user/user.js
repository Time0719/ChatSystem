import React from 'react';
import { connect } from 'react-redux';
import { Result, List, WhiteSpace, Modal} from 'antd-mobile';
import 'antd-mobile/dist/antd-mobile.css';
import browserCookie from 'browser-cookies';
import { logoutSubmit } from '../../redux/user.redux';
import { Redirect } from 'react-router-dom';


const User = (props) => {

    const logout = () => {
        Modal.alert('注销', '确定退出登录吗？', [
            { text: '取消', onPress: () => console.log('cancel') },
            {
                text: '确定', onPress: () => {
                    browserCookie.erase('userid');
                    props.logoutSubmit();
                }
            },
        ])
    };

    return props.user ? (
        <>
            <Result
                img={<img src={require(`../img/${props.avatar}.jpg`)} alt='' style={{ width: 60 }} />}
                title={props.user}
                message={props.type === 'boss' ? props.company : null}
            />
            <List renderHeader={() => '简介'} >
                <List.Item multipleLine>
                    {props.title}
                    {props.desc.split('\n').map(v => <List.Item.Brief key={v}>{v}</List.Item.Brief>)}
                    {props.money ? <List.Item.Brief>薪资:{props.money}</List.Item.Brief> : null}
                </List.Item>
            </List>
            <WhiteSpace></WhiteSpace>
            <List>
                <List.Item onClick={logout} style={{ zIndex: 999 }}>退出登录</List.Item>
            </List>
        </>
    ) : <Redirect to={props.redirectTo} />;
};

export default connect(s => s.user, { logoutSubmit })(User);