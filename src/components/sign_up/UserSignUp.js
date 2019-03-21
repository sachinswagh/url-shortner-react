import React, {Component} from 'react';
import { withRouter } from 'react-router';
import * as APIHandler from '../../shared/APIHandler';
// import * as sessionHelper from '../../shared/SessionHelper';
import * as config from '../../shared/Config';

class UserSignUp extends Component {

  constructor(props, context) {
    super(props, context);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.txtUserName = null;
    this.txtPassword = null;
  }

  redirectToDashbord() {
  	console.log('redirectToDashbord ...');
    this.props.history.push("/uri/shortner");
  }

  /**
   * Handles SignUp form submission.
   * @param event - Form submit event.
   */
  handleSubmit(event) {
    event.preventDefault();
    let self = this;
    let user = {
      user: {
        email: this.txtUserEmail.value,
        password: this.txtPassword.value,
        first_name: this.txtUserFirstName.value,
        last_name: this.txtUserLastName.value
      }
    }

    // Extracting URL
    let url = config.apiEndpointV1 + '/auths/sign_up';

    // Executing SignUp API.
    APIHandler.save(url, user, function (error, resp) {
      if(resp && resp.data) {
        self.redirectToDashbord();
      } else {
        // TODO: Error Handling will go here
      }
    });
  }

  render() {
    return (
      <div>
        <div className="container jumbotron">
          <div className="card card-login mx-auto">
            <div className="card-header text-center">
              <a className="pull-right" href="/user/login"> Sign In </a>
              <p className="strike">
                <span className="login-box-msg"> User SignUp </span>
              </p>
            </div>
            <div className="card-body">
              <form onSubmit={this.handleSubmit}>
                <div className="row">
                  <div className="input-group col-md-offset-6 col-md-2">
                    <span className="input-group-addon"> First Name </span>
                  </div>
                  <div className="input-group col-md-offset-6 col-md-4">
                    <input type="text" className="form-control" placeholder="FirstName" ref={(userFirstName) => { this.txtUserFirstName = userFirstName; }}/>
                  </div>
                </div>
                <div className="row">
                  <div className="input-group col-md-offset-6 col-md-2">
                    <span className="input-group-addon"> Last Name </span>
                  </div>
                  <div className="input-group col-md-offset-6 col-md-4">
                    <input type="text" className="form-control" placeholder="LastName" ref={(userLastName) => { this.txtUserLastName = userLastName; }}/>
                  </div>
                </div>
                <div className="row">
                  <div className="input-group col-md-offset-6 col-md-2">
                    <span className="input-group-addon"> Email </span>
                  </div>
                  <div className="input-group col-md-offset-6 col-md-4">
                    <input type="email" className="form-control" placeholder="Email" ref={(userEmail) => { this.txtUserEmail = userEmail; }}/>
                  </div>
                </div>
                <div className="row">
                  <div className="input-group col-md-offset-6 col-md-2">
                    <span className="input-group-addon"> Password </span>
                  </div>
                  <div className="input-group col-md-offset-6 col-md-4">
                    <input type="password" className="form-control" placeholder="Password" ref={(password) => { this.txtPassword = password; }}/>
                  </div>
                </div>
                <div className="row">
                  <div className="input-group text-center col-md-offset-6 col-md-4">
                    <button type="submit" className="btn btn-success center-block">SignUp</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default  withRouter(UserSignUp);
