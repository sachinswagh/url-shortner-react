import React, { Component } from 'react';
import * as APIHandler from '../../../shared/APIHandler';
import * as sessionHelper from '../../../shared/SessionHelper';
import * as config from '../../../shared/Config';

const enhanceWithClickOutside = require('react-click-outside');
/**
 * Component for header
 */
class Header extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      showUserMenu: false,
    };
    this.logout = this.logout.bind(this);
    this.openUserMenu = this.openUserMenu.bind(this);
  }
  /**
   * Handle post logout link
   */
  redirectToLogin() {
    window.location.href = "/user/login";
  }
  /**
   * Control logout action
   */
  logout() {
    let self = this;
    let url = config.apiEndpointV1 + '/auths/logout';
    APIHandler.save(url, {}, function (error, resp) {
      sessionHelper.removeContext();
      self.redirectToLogin();
    });
  }
  /**
   * Handle outside click for user menu
   */
  handleClickOutside() {
    this.setState({ showUserMenu: false });
  }
  /**
   * Handle open user menu action
   */
  openUserMenu() {
    this.setState({ showUserMenu: true });
  }
  /**
   * Provide logged in user name
   */
  getUserName(){
    if(sessionHelper.getUserFirstName() && sessionHelper.getUserLastName()){
      return sessionHelper.getUserFirstName() +' '+ sessionHelper.getUserLastName();
    }else if (sessionHelper.getUserFirstName() && !sessionHelper.getUserLastName()){
      return sessionHelper.getUserFirstName();
    }else if (!sessionHelper.getUserFirstName() && sessionHelper.getUserLastName()){
      return sessionHelper.getUserLastName();
    } else {
      return sessionHelper.getUserFirstName();
    }
  }
  render() {
    return (
      <div className="col-md-11" id="header-section">
        <div className="row pull-right">
          <div className="col-md-6 pull-left">
            <a className="user-link" onClick={this.openUserMenu}>
              <i className="fa fa-user fa-fw"></i> {this.getUserName()}
            </a>
          </div>
          <div className="col-md-3 pull-left">
            <a className="login-box-msg pull-right" href="/user/auth_detail"> Api Key </a>
          </div>
          <div className="col-md-3 pull-left">
            <a className="login-box-msg pull-right" href="/uri/shortner"> Uri Shortner </a>
          </div>
          <div className="col-md-3 pull-left">
            <a href="javascript:void(0)" onClick={this.logout}>
              <i className="fa fa-power-off pull-left"></i>
              <h5 data-selenium-id="logout" className="pull-left"> Logout</h5>
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default enhanceWithClickOutside(Header);