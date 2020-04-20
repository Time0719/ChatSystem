import React, { useState } from 'react';
import { Grid, List } from 'antd-mobile';
import PropTypes from 'prop-types';


const AvatarSelector = (props) => {
    const [state, setState] = useState({});
    const avatarList = '1,2,3,4,5,6,7,8,9,10,11,12,13,14,15'
        .split(',')
        .map(v => ({
            icon: require(`../img/${v}.jpg`),
            text: v
        }));
    const gridHeader = state.text
        ? (
            <div>
                <span>已选择头像</span>
                <img style={{ width: 20, marginLeft: '10px' }} src={state.icon} alt=''></img>
            </div>
        ) : '请选择头像';

    return (
        <>
            <List renderHeader={() => gridHeader}>
                <Grid
                    data={avatarList}
                    columnNum={5}
                    onClick={elm => {
                        setState(elm);
                        props.selectAvatar(elm.text)
                    }} />
            </List>
        </>
    );
};

AvatarSelector.propTypes = {
    selectAvatar: PropTypes.func.isRequired
};


export default AvatarSelector;