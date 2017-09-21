import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Tab from './components/Tab';
import Home from './containers/Home';
import Lesson from './containers/Lesson';
import Profile from './containers/Profile';
import Login from './containers/Login';
import Reg from './containers/Reg';
import Detail from './containers/Detail';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import store from './redux/store';
import { Provider } from 'react-redux';
import './common/reset.less';
import './common/index.less';
import './common/rem';

import { ConnectedRouter } from 'react-router-redux';
import createHistory from 'history/createHashHistory';
let history=createHistory();

ReactDOM.render(
  <Provider store={store}>
    <div>
      <ConnectedRouter history={history}>
        <Switch>
          <Route exact path={'/'} component={Home} />
          <Route path={'/lesson'} component={Lesson} />
          <Route path={'/profile'} component={Profile} />
          <Route path={'/login'} component={Login} />
          <Route path={'/reg'} component={Reg} />
          <Route path={'/detail'} component={Detail} />
        </Switch>
      </ConnectedRouter>
      <Tab />
    </div>
  </Provider>,
  document.getElementById('root')
);