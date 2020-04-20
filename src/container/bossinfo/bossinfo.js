import React, { useState } from 'react';
import { NavBar, InputItem, TextareaItem, Button } from 'antd-mobile';
import 'antd-mobile/dist/antd-mobile.css';
import AvatarSelector from '../../component/avatar-selector/avatar-selector';
import { connect } from 'react-redux';
import { update } from '../../redux/user.redux';
import { Redirect } from 'react-router-dom';


const BossInfo = (props) => {
    const path = props.location.pathname;
    const redirect = props.redirectTo;
    const [state, setState] = useState({
        title: '',
        desc: '',
        company: '',
        money: ''
    });

    const onChange = (key, val) => {
        setState({ ...state, [key]: val });
    };

    return (
        <>
            {redirect && redirect !== path ? <Redirect to={props.redirectTo} /> : null}
            <NavBar mode="dark">BOSS完善信息页</NavBar>
            <AvatarSelector selectAvatar={(imgname) => { setState({ avatar: imgname }) }} />
            <InputItem onChange={(v) => onChange('title', v)}>
                招聘职位
            </InputItem>
            <InputItem onChange={(v) => onChange('company', v)}>
                公司名称
            </InputItem>
            <InputItem onChange={(v) => onChange('money', v)}>
                职位薪资
            </InputItem>
            <TextareaItem
                onChange={(v) => onChange('desc', v)}
                rows={3}
                autoHeight
                title='职位要求'
            >
                职位要求
            </TextareaItem>
            <Button
                onClick={() => {
                    props.update(state)
                }}
                type='primary'>保存</Button>
        </>
    );
};

export default connect(s => s.user, { update })(BossInfo);