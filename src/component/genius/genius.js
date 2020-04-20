import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getUserList } from '../../redux/chatuser.redux';
import UserCard from '../usercard/usercard';


const Genius = (props) => {

    useEffect(() => {
        props.getUserList('boss');
    }, [props]);

    return <UserCard userlist={props.userlist} />;
};

export default connect(s => s.chatuser, { getUserList })(Genius);