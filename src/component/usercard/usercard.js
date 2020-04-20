import React from 'react';
import PropTypes from 'prop-types';
import { Card, WingBlank, WhiteSpace } from 'antd-mobile';
import 'antd-mobile/dist/antd-mobile.css';
import { withRouter } from 'react-router-dom';


const UserCard = (props) => {

    const handleClick = (v) => {
        props.history.push(`/chat/${v._id}`);
    };

    return (
        <>
            <WingBlank>
                <WhiteSpace />
                {props.userlist.map(v => (
                    v.avatar ? (
                        <Card key={v._id} onClick={() => handleClick(v)} >
                            <Card.Header
                                title={v.user}
                                thumb={require(`../img/${v.avatar}.jpg`)}
                                extra={<span>{v.title}</span>}
                                thumbStyle={{ width: 20 }}
                            />
                            <Card.Body>
                                {v.type === 'boss' ? <div>公司：{v.company}</div> : null}
                                {v.desc.split('\n').map(d => (
                                    <div key={d}>{d}</div>
                                ))}
                                {v.type === 'boss' ? <div>薪资：{v.money}</div> : null}
                            </Card.Body>
                        </Card>) : null
                ))}
            </WingBlank>
        </>
    );
};

UserCard.propTypes = {
    userlist: PropTypes.array.isRequired
};

export default withRouter(UserCard);