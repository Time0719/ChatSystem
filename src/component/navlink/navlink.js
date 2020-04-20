import React from 'react';
import PropTypes from 'prop-types';
import { TabBar } from 'antd-mobile';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';


const NavLinkBar = (props) => {
    const NavList = props.data.filter(v => !v.hide);
    const { pathname } = props.location;
    
    return (
        <TabBar>
            {NavList.map(v => (
                <TabBar.Item
                    badge={v.path === '/msg' ? props.unread : 0}
                    key={v.path}
                    title={v.text}
                    icon={{ uri: require(`./img/${v.icon}.png`) }}
                    selectedIcon={{ uri: require(`./img/${v.icon}-active.png`) }}
                    selected={pathname === v.path}
                    onPress={() => {
                        props.history.push(v.path);
                    }}
                />
            ))}
        </TabBar>
    );
}

NavLinkBar.propTypes = {
    data: PropTypes.array.isRequired
};

export default withRouter(connect(s => s.chat)(NavLinkBar));