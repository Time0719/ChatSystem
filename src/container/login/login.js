import React from 'react';
import Logo from '../../component/logo/logo';
import { List, InputItem, WingBlank, WhiteSpace, Button } from 'antd-mobile';
import { connect } from 'react-redux';
import { login } from '../../redux/user.redux';
import { Redirect } from 'react-router-dom';
import imoocFrom from '../../component/imooc-form/imooc-form';

//高级组件概念：装饰性模式 1、HOC高阶组件原理 2、就是@符号作用
// 列1：const hello = () => {
//     console.log('hello imooc i love React');
// };
// const WrapperHello = (fn) => {
//     return () => {
//         console.log('before say hello');
//         fn();
//         console.log('after say hello');
//     }
// };
// hello = WrapperHello(hello);
// hello();
//列2：const WrapperHello = (Comp) => {  //属性代理
// const Comp = () => {
//     console.log('高阶组件新增的生命周期，加载完成');
// };
//     const WrapComp = (props) => {
//         return (<div>
//             <p>这是HOC高阶组件特有的元素</p>
//             <Comp {...props}></Comp>
//         </div >)
//     };
//     return WrapComp;
// };
// @WrapperHello


const Login = (props) => {

    const register = () => {
        props.history.push('/register');
    };

    const handleLogin = () => {
        props.login(props.state);
    };

    return (
        <div>
            {props.redirectTo && props.redirectTo !== '/login' ? <Redirect to={props.redirectTo} /> : null}
            <Logo></Logo>
            <WingBlank>
                <List>
                    {props.msg ? <p className='error-msg'>{props.msg}</p> : null}
                    <InputItem onChange={v => props.handleChange('user', v)}>用户</InputItem>
                    <WhiteSpace />
                    <InputItem type='password' onChange={v => props.handleChange('pwd', v)}>密码</InputItem>
                </List>
                <WhiteSpace />
                <Button type='primary' onClick={handleLogin}>登录</Button>
                <WhiteSpace />
                <Button onClick={register} type='primary'>注册</Button>
            </WingBlank>
        </div>
    );
};

export default imoocFrom(connect(s => s.user, { login })(Login));