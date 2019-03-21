import React, {Component} from 'react';
import { withRouter } from 'react-router';
import * as APIHandler from '../../shared/APIHandler';
import * as config from '../../shared/Config';
import Header from '../layout/header/Header';

class UriShortner extends Component {

  constructor(props, context) {
    super(props, context);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.txtLongUrl = null;
    this.txtApiKey = null;
    this.txtShortUrl = null;
  }

  redirectToDashbord() {
    this.props.history.push("/uri/shortner");
  }

  handleSubmit(event) {
    event.preventDefault();
    let self = this;
    let long_url = this.txtLongUrl.value;
    let api_key = this.txtApiKey.value;

    let url = (config.apiEndpointV1 + '/uri/shorten.json?long_url=' + long_url + '&api_key=' + api_key);

    APIHandler.get(url, function (error, resp) {
      if(resp) {
        if(resp.data) {
          self.txtShortUrl.value = resp.data.short_url;
        } else {
          alert("Error: ", resp.errors);
        }
      } else {
        alert("Error. Check all required params / valid Api Key.");
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
                <span className="login-box-msg"> URL SHORTNER </span>
              </p>
            </div>
            <div className="card-body">
              <form onSubmit={this.handleSubmit}>
                <div className="input-group row">
                  <div className="col-md-2">
                    <span className=""> LONG URL </span>
                  </div>
                  <div className="col-md-9">
                    <input type="url" className="form-control" placeholder="Enter a Long URL" ref={(longUrl) => { this.txtLongUrl = longUrl; }}/>
                  </div>
                </div>

                <br/>

                <div className="input-group row">
                  <div className="col-md-2">
                    <span className=""> Api Key </span>
                  </div>
                  <div className="col-md-9">
                    <input type="text" className="form-control" placeholder="Enter an API KEY" ref={(apiKey) => { this.txtApiKey = apiKey; }}/>
                  </div>
                  <div className="col-md-1">
                    <button type="submit" className="btn btn-success center-block"> Shorten </button>
                  </div>
                </div>

                <br/>

                <div className="input-group row">
                  <div className="col-md-2">
                    <span className=""> SHORT URL </span>
                  </div>
                  <div className="col-md-5">
                    <input type="text" className="form-control" readOnly placeholder="You will see a Short URL here" ref={(shortUrl) => { this.txtShortUrl = shortUrl; }} />
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

export default  withRouter(UriShortner);
