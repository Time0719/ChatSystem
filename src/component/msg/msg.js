import React from 'react';
import { connect } from 'react-redux';
import { List, Badge } from 'antd-mobile';


const Msg = (props) => {
    const userid = props.user._id;
    const userinfo = props.chat.users;

    const msgGroup = {};
    props.chat.chatmsg.forEach(v => {
        msgGroup[v.chatid] = msgGroup[v.chatid] || [];
        msgGroup[v.chatid].push(v);
    });

    const chatList = Object.values(msgGroup).sort((a, b) => {
        const a_last = getLast(a).create_time;
        const b_last = getLast(b).create_time;
        return b_last - a_last;
    });

    const getLast = (arr) => {
        return arr[arr.length - 1];
    };

    return (
        <>
            {chatList.map(v => {
                console.log(v);
                const lastItem = getLast(v);
                const targetId = v[0].from === userid ? v[0].to : v[0].from;
                const unreadNum = v.filter(v => !v.read && v.to === userid).length;
                if (!userinfo[targetId]) {
                    return null;
                }
                return (
                    <List key={lastItem._id}>
                        <List.Item
                            extra={<Badge text={unreadNum}></Badge>}
                            thumb={require(`../img/${userinfo[targetId].avatar}.jpg`)}
                            arrow='horizontal'
                            onClick={() => props.history.push(`/chat/${targetId}`)}
                        >
                            {userinfo[targetId].name}
                            <List.Item.Brief>{lastItem.content}</List.Item.Brief>
                        </List.Item>
                    </List>
                );
            })}
        </>
    );
};

export default connect(s => s)(Msg);