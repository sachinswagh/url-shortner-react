import React, {Component} from 'react';
import { withRouter } from 'react-router';
import * as APIHandler from '../../shared/APIHandler';
import * as sessionHelper from '../../shared/SessionHelper';
import * as config from '../../shared/Config';

class UserLogin extends Component {

  constructor(props, context) {
    super(props, context);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.txtUserName = null;
    this.txtPassword = null;
  }

  redirectToDashbord() {
    this.props.history.push("/uri/shortner");
  }

  /**
   * Handles Login form submission.
   * @param event - Form submit event.
   */
  handleSubmit(event) {
    event.preventDefault();
    let self = this;
    let user = {
      user: {
        email: this.txtUserEmail.value,
        password: this.txtPassword.value,
      }
    }

    // Extracting URL
    let url = config.apiEndpointV1 + '/auths/login';

    // Executing Login API.
    APIHandler.save(url, user, function (error, resp) {
      if(resp && resp.data) {
        if(resp.data.status === 'not_found') {
          alert('User Not Found')
        } else {
          sessionHelper.setContext(resp.data);
          self.redirectToDashbord();
        }
      } else {
        // TODO: Error Handling will go here
      }
    });
  }

  render() {
    return (
      <div className="container jumbotron">
        <div className="card card-login mx-auto">
          <div className="card-header text-center">
            <p className="strike">
              <a className="login-box-msg pull-right" href="/user/sign_up"> Sign Up </a>
            </p>
            <p className="strike">
              <b className="login-box-msg"> URL SHORTNER </b>
            </p>
            <p className="strike">
              <span className="login-box-msg"> User Login </span>
            </p>
          </div>

          <div className="card-body">
            <form onSubmit={this.handleSubmit}>
              <div className="row">
                <div className="input-group col-md-offset-6 col-md-4">
                  <input type="email" className="form-control" placeholder="Email" ref={(userEmail) => { this.txtUserEmail = userEmail; }}/>
                </div>
                <div className="input-group col-md-offset-6 col-md-4">
                  <input type="password" className="form-control" placeholder="Password" ref={(password) => { this.txtPassword = password; }}/>
                </div>
                <div className="input-group text-center col-md-offset-6 col-md-4">
                  <button type="submit" className="btn btn-success center-block">Login</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default  withRouter(UserLogin);
