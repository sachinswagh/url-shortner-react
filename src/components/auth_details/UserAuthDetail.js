import React, {Component} from 'react';
import { withRouter } from 'react-router';
import * as APIHandler from '../../shared/APIHandler';
import * as config from '../../shared/Config';
import Header from '../layout/header/Header';

class UserAuthDetail extends Component {

  constructor(props, context) {
    super(props, context);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.txtApiKey = null;
  }

  redirectToDashbord() {
    this.props.history.push("/uri/shortner");
  }

  handleSubmit(event) {
    event.preventDefault();
    let self = this;
    let url = (config.apiEndpointV1 + '/auth_details.json');
    let data = {};

    APIHandler.save(url, data, function (error, resp) {
      if(resp && resp.data) {
        self.txtApiKey.value = resp.data.api_key;
      } else {
        alert('Error');
      }
    });
  }

  render() {
    return (
      <div>
        <div className="fixed-top">
          <nav className="navbar navbar-expand-lg navbar-light" id="mainNav">
            <Header></Header>
          </nav>
        </div>
        <div className="container jumbotron">
          <div className="card card-login mx-auto">
            <div className="card-header text-center">
              <p className="strike">
                <span className="login-box-msg"> Generate API Key </span>
              </p>
            </div>
            <div className="card-body">
              <form onSubmit={this.handleSubmit}>
                <div className="input-group row">
                  <div className="col-md-3">
                    <button type="submit" className="btn btn-success center-block"> Generate API Key </button>
                  </div>
                  <div className="col-md-7">
                    <input type="text" className="form-control" readOnly placeholder="You will see API Key here" ref={(apiKey) => { this.txtApiKey = apiKey; }} />
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

export default  withRouter(UserAuthDetail);
