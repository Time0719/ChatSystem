import React, { useEffect } from 'react';
import Logo from '../../component/logo/logo';
import { List, InputItem, Radio, WhiteSpace, Button } from 'antd-mobile';
import 'antd-mobile/dist/antd-mobile.css';
import { connect } from 'react-redux';
import { register } from '../../redux/user.redux';
import { Redirect } from 'react-router-dom';
import imoocFrom from '../../component/imooc-form/imooc-form';


const Register = (props) => {

    const handleRegister = () => {
        props.regisger(props.state);
    };

    useEffect(() => {
        props.handleChange('type', 'genius');
    }, [props])

    return (
        <div>
            {props.redirectTo ? <Redirect to={props.redirectTo} /> : null}
            <Logo></Logo>
            <List>
                {props.msg ? <p className='error-msg'>{props.msg}</p> : null}
                <InputItem onChange={v => props.handleChange('user', v)}> 用户名</InputItem>
                <WhiteSpace />
                <InputItem type='password' onChange={v => props.handleChange('pwd', v)}>密码</InputItem>
                <WhiteSpace />
                <InputItem type='password' onChange={v => props.handleChange('repeatpwd', v)}>确认密码</InputItem>
                <WhiteSpace />
                <Radio.RadioItem checked={props.state.type === 'genius'} onChange={v => props.handleChange('type', 'genius')}>牛人</Radio.RadioItem>
                <Radio.RadioItem checked={props.state.type === 'boss'} onChange={v => props.handleChange('type', 'boss')}>BOSS</Radio.RadioItem>
                <WhiteSpace />
                <Button type='primary' onClick={(handleRegister)}>注册</Button>
            </List>
        </div>
    );
};

export default imoocFrom(connect(s => s.user, { register })(Register));