import React, { useState } from 'react';
import { NavBar, InputItem, TextareaItem, Button } from 'antd-mobile';
import 'antd-mobile/dist/antd-mobile.css';
import AvatarSelector from '../../component/avatar-selector/avatar-selector';
import { connect } from 'react-redux';
import { update } from '../../redux/user.redux';
import { Redirect } from 'react-router-dom';


const GeniusInfo = (props) => {
    const path = props.location.pathname;
    const [state, setState] = useState({
        title: '',
        desc: ''
    });

    const onChange = (key, val) => {
        setState({ ...state, [key]: val });
    };

    return (
        <>
            {props.redirectTo && props.redirectTo !== path ? <Redirect to={props.redirectTo} /> : null}
            <NavBar mode="dark">牛人完善信息页</NavBar>
            <AvatarSelector selectAvatar={(imgname) => { setState({ avatar: imgname }) }} />
            <InputItem onChange={(v) => onChange('title', v)}>
                求职岗位
            </InputItem>
            <TextareaItem
                onChange={(v) => onChange('desc', v)}
                rows={3}
                autoHeight
                title='个人简介'
            >
                个人简介
            </TextareaItem>
            <Button
                onClick={() => {
                    props.update(state)
                }}
                type='primary'>保存</Button>
        </>
    );
};

export default connect(s => s.user, { update })(GeniusInfo);