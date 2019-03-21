import React from 'react';
import { render } from 'react-dom';
import "babel-polyfill";
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.min.css';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import UserLogin from './components/login/UserLogin';
import UserSignUp from './components/sign_up/UserSignUp';
import UriShortner from './components/uri/UriShortner';
import UserAuthDetail from './components/auth_details/UserAuthDetail';
import * as sessionHelper from './shared/SessionHelper';

/**
 * Provide Logged in user status.
 */
function auth() {
  return sessionHelper.isLoggedIn();
}

render((
  <BrowserRouter>
    <Switch>
      <Route exact path="/user/login" render={() => (
        auth() ? <Redirect to="/uri/shortner" /> : <UserLogin />)} />

      <Redirect from="/" exact to="/user/login" />

      <Route exact path="/user/auth_detail" render={() => <UserAuthDetail />} />
      <Route exact path="/user/sign_up" render={() => <UserSignUp />} />
      <Route exact path="/sign_up" render={() => <UserSignUp />} />

      <Route exact path="/uri/shortner" render={() => (
        auth() ? <UriShortner /> : <Redirect to="/user/login" />)} />
    </Switch>

  </BrowserRouter>
), document.getElementById('root'));
registerServiceWorker();
