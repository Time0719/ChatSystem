import React from 'react';
import { connect } from 'react-redux';
import { addGun, removeGun, addGunAsync } from './index.redux';


const mapStatetoProps = (state) => {
    return { num: state.connect};
};
const actionCreators = { addGun, removeGun, addGunAsync };

const App = (props) => {
    return (
        <>
            <h1>现在有机枪{props.num}把</h1>
            <button onClick={props.addGun}>申请武器</ button>
            <button onClick={props.removeGun}>申请武器</ button>
            <button onClick={props.addGunAsync}>拖两天再给</ button>
        </>
    )
};

export default connect(mapStatetoProps, actionCreators)(App);