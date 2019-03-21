// imports
import axios from 'axios';
import * as sessionHandler from './SessionHelper'

/**
 * We are using get for GET method, save for POST method, update for PUT method, remove for DELETE method.
 * As delete is keyword we are using method name as remove.
 */

// module.exports = {

  /**
   * Executes GET API
   * @param url - Input URL for GET method.
   * @returns {Axios Promise}
   */
  export function get(url, callback) {
    headers();
    return axios.get(url).then(function (response) {
      callback(null, response)
    }).catch(function (error) {
        handleError(error);
        callback(error, null);
      }
    );
  };

  /**
   * Executes POST API.
   * @param url - Input URL for POST method.
   * @param data - Data to be passed over the POST call.
   * @returns {Axios Promise}
   */
  export function save(url, data, callback) {
    headers();
    return axios.post(url, data).then(function (response) {
      callback(null, response)
    }).catch(function (error) {
        handleError(error);
        callback(error, null);
      }
    );
  };

  /**
   * Executes PUT API.
   * @param url - Input URL for PUT method.
   * @param data - Data to be passed over the PUT call.
   * @returns {Axios Promise}
   */
  export function update(url, data, callback) {
    headers();
    return axios.put(url, data).then(function (response) {
      callback(null, response)
    }).catch(function (error) {
        handleError(error);
        callback(error, null);
      }
    );
  };

  /**
   * Executes DELETE API
   * @param url - nput URL for DELETE method.
   * @returns {Axios Promise}
   */
  export function remove (url, callback) {
    // headers();
    return axios.delete(url).then(function (response) {
      callback(null, response)
    }).catch(function (error) {
        handleError(error);
        callback(error, null);
      }
    );
  }
// }

/**
 * Executes PUT API.
 * @param url - Input URL for PUT method.
 * @param data - Data to be passed over the PUT call.
 * @returns {Axios Promise}
 */
export function saveWithFiles(url, data, fileKey, callback) {
  axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';

  if(sessionHandler.getToken()) {
    axios.defaults.headers.common['Authorization'] = sessionHandler.getToken();
  }

  let formData: FormData = new FormData();

  if(data) {
    for (let key in data) {
      if(key === fileKey) {
        formData.append(key, data[key], data[key].name)
      } else {
        if(typeof data[key] === 'object') {
          let nested_obj = data[key];
          for (let nested_key in nested_obj) {
            formData.append(key+"["+nested_key+"]", nested_obj[nested_key]);
          }
        } else {
          formData.append(key, data[key] );
        }
      }
    }
  }
  return axios.put(url, formData).then(function (response) {
    callback(null, response)
  }).catch(function (error) {
      handleError(error);
      callback(error, null);
    }
  );
};

/**
* Executes POST API.
* @param url - Input URL for POST method.
* @param data - Data to be passed over the POST call.
* @returns {Axios Promise}
*/
export function postWithFiles(url, data, fileKey, callback) {
 axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';

 if(sessionHandler.getToken()) {
   axios.defaults.headers.common['Authorization'] = sessionHandler.getToken();
 }

 let formData: FormData = new FormData();

 if(data) {
   for (let key in data) {
     if(key === fileKey) {
       formData.append(key, data[key], data[key].name)
     } else {
       if(typeof data[key] === 'object') {
         let nested_obj = data[key];
         for (let nested_key in nested_obj) {
           formData.append(key+"["+nested_key+"]", nested_obj[nested_key]);
         }
       } else {
         formData.append(key, data[key] );
       }
     }
   }
 }
 return axios.post(url, formData).then(function (response) {
   callback(null, response)
 }).catch(function (error) {
     handleError(error);
     callback(error, null);
   }
 );
};

var headers = function () {
  axios.defaults.headers.post['Content-Type'] = 'application/json';
  axios.defaults.withCredentials = false;
  axios.defaults.headers.common['Accept'] = 'application/json';
  // let token = document.getElementsByName('csrf-token')[0].getAttribute('content');
  // axios.defaults.headers.common['X-CSRF-Token'] = token;
  // axios.defaults.headers['Access-Control-Allow-Methods'] = 'GET, PUT, POST, DELETE, OPTIONS';
  if(sessionHandler.getToken()) {
    axios.defaults.headers.common['Authorization'] = sessionHandler.getToken();
  }
};

var handleError =  function(error) {
  if(error && error.response) {
    if(error.response.status === 401) {
      sessionHandler.removeContext();
      window.location.href = '/user/login';
    }
  }
}
