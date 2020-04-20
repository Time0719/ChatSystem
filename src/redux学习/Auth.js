import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { login,getUserData } from './Auth.redux';


const Auth = (props) => {

    useEffect(() => {
        props.getUserData();
    }, [])
    
    return (
        <>
            <div>{props.user}</div>
            {props.isAuth ? <Redirect to='/dashboard' /> : null}
            <h1>你没有权限，请去登录</h1>
            <button onClick={props.login}>登录</button>
        </>
    )
};

export default connect(s => s.auth, { login,getUserData })(Auth);