import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';

import Login from './container/login/login';
import Register from './container/register/register';
import AuthRoute from './component/authroute/authroute';
import BossInfo from './container/bossinfo/bossinfo';
import GeniusInfo from './container/geniusinfo/geniusinfo';
import Dashboard from './component/dashboard/dashboard';
import Chat from './component/chat/chat';

const App = () => {

    return (
        <>
            <AuthRoute />
            <Switch>
                <Route path='/login' exact component={Login}></Route>
                <Route path='/register' component={Register}></Route>
                <Route path='/bossinfo' component={BossInfo}></Route>
                <Route path='/geniusinfo' component={GeniusInfo}></Route>
                <Route path='/chat/:user' component={Chat}></Route>
                <Route component={Dashboard}></Route>
                {/* <Redirect to='/login' /> */}
            </Switch>
        </>
    );
};

export default App;