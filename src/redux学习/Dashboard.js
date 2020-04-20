import React from 'react';
import { Link, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import App from './app';
import { logout } from './Auth.redux';


const Dashboard = (props) => {
    const Erying = () => <h2>二营</h2>;
    const Qibinglian = () => <h2>骑兵连</h2>;

    const app = (
        <>
            {props.isAuth ? <button onClick={props.logout}>注销</button> : null}
            <ul>
                <li>
                    <Link to='/dashboard/'>一营</Link>
                </li>
                <li>
                    <Link to='/dashboard/erying'>二营</Link>
                </li>
                <li>
                    <Link to='/dashboard/qibinglian'>骑兵连</Link>
                </li>
            </ul>
            <Route path='/dashboard/' exact component={App}></Route>
            <Route path='/dashboard/erying' component={Erying}></Route>
            <Route path='/dashboard/qibinglian' component={Qibinglian}></Route>
        </>
    );

    return props.isAuth ? app : <Redirect to='/login'></Redirect>;
};

export default connect(s => s.auth, { logout })(Dashboard);