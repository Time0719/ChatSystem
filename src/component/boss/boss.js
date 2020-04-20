import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getUserList } from '../../redux/chatuser.redux';
import UserCard from '../usercard/usercard';


const Boss = (props) => {

    useEffect(() => {
        props.getUserList('genius');
    }, [props]);

    return <UserCard userlist={props.userlist} />;
};

export default connect(s => s.chatuser, { getUserList })(Boss);