import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { List, InputItem, NavBar, Icon, Grid } from 'antd-mobile';
import 'antd-mobile/dist/antd-mobile.css';
import { sendMsg, getMsgList, recvMsg, readMsg } from '../../redux/chat.redux';
import { getChatId } from '../../util';
import QueueAnim from 'rc-queue-anim';


const Chat = (props) => {
    const [state, setState] = useState({ test: '', msg: [], showEmoji: false });
    const userid = props.match.params.user;
    const users = props.chat.users;
    const chatid = getChatId(userid, props.user._id);
    const chatmsgs = props.chat.chatmsg.filter(v => v.chatid === chatid);
    const emoji = '😀,😊,😁,🥺,😆,🥰,😂,😷,😊,😅,🤣,😉,😇,😍,🤩,😘,😜,🤑,🤐,😏,🤥,🤢,🤧,😲,😨,😤,😱,😡,🤡,😹,❤️,👶,👼,🎅,🤶,⛄,🎄,✨,🎍,🧛‍♂️,🧟,🧚‍♀️,👨‍👩‍👦,👒,💍,👑,💄,🙈,🦊,🐷,🐭,🐔,🐸,🐬,🐠,🐙,🐌,🌸,💐,🌻,☘️,🍂,🦞,🦑,🌞,⭐,🌟,⛈️,🌨️,🌈,💧'
        .split(',').map(v => ({ text: v }));

    const handleSubmit = () => {
        const from = props.user._id;  //当前用户
        const to = props.match.params.user;  //发送给谁
        const msg = state.test;  //发送内容
        props.sendMsg({ from, to, msg });
        setState({ ...state, test: '', showEmoji: false });
    };

    useEffect(() => {
        if (!props.chat.chatmsg.length) {
            props.getMsgList();
            props.recvMsg();
        }
        return () => {
            const to = props.match.params.user;
            props.readMsg(to);
        }
    }, [props]);

    const fixCarousel = () => {  //解决emoji只弹出一行的bug问题
        setTimeout(() => {
            window.dispatchEvent(new Event('resize'));
        }, 0);
    };

    if (!users[userid]) {
        return null
    }

    return (
        <div id='chat-page'>
            <NavBar
                mode='dark'
                icon={<Icon type="left" />}
                onLeftClick={() => props.history.goBack()}
            >
                {users[userid].name}
            </NavBar>
            <QueueAnim delay={100}>
                {chatmsgs.map(v => {
                    const avatar = require(`../img/${users[v.from].avatar}.jpg`);
                    return v.from === userid ? (
                        <List key={v._id}>
                            <List.Item thumb={avatar}>{v.content}</List.Item>
                        </List>
                    ) : (
                            <List key={v._id}>
                                <List.Item extra={<img src={avatar} alt='' />} className='chat-me'>{v.content}</List.Item>
                            </List>
                        )
                })}
            </QueueAnim>
            <div className='stick-footer'>
                <List>
                    <InputItem
                        placeholder='请输入'
                        value={state.test}
                        onChange={v => setState({ ...state, test: v })}
                        extra={
                            <>
                                <span
                                    style={{ marginRight: 15 }}
                                    onClick={() => {
                                        setState({ ...state, showEmoji: !state.showEmoji })
                                        fixCarousel();
                                    }}>😊</span>
                                <span onClick={() => handleSubmit()}>发送</span>
                            </>
                        }
                    />
                </List>
                {state.showEmoji ?
                    <Grid
                        data={emoji}
                        columnNum={9}
                        carouselMaxRow={4}
                        isCarousel={true}
                        onClick={el => setState({ ...state, test: state.test + el.text })}
                    /> : null}
            </div>
        </div >
    );
};

export default connect(s => s, { sendMsg, getMsgList, recvMsg, readMsg })(Chat);