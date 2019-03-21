 /**
  * Session Helper for the application.
  */

 /**
  * Sets the current session context for the application.
  * @param data
  */
  export function setContext(data) {
    localStorage.setItem('token', data.token);
    localStorage.setItem('isLoggedIn', true);
    localStorage.setItem('user_first_name', data.user_first_name);
    localStorage.setItem('user_last_name', data.user_last_name);
    localStorage.setItem('user_id', data.user_id);
    localStorage.setItem('email', data.email);
  };

 /**
  * Removes the current session context of the application.
  * @param url
  */
  export function removeContext() {
    localStorage.removeItem('token');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('user_first_name');
    localStorage.removeItem('user_last_name');
    localStorage.removeItem('user_id');
    localStorage.removeItem('email');
    localStorage.setItem('lastPath', '' );
  };


  export function getUserFirstName() {
   return localStorage.getItem('user_first_name') || '';
  }

  export function getUserLastName() {
   return localStorage.getItem('user_last_name') || '';
  }

  export function getUserId() {
   return localStorage.getItem('user_id') || '';
  }

  export function getEmail() {
   return localStorage.getItem('email') || '';
  }

  export function getToken() {
   return localStorage.getItem('token') || null;
  }

  export function getAccountClass() {
    return localStorage.getItem('account_class') || null;
  }

  export function getUserType() {
    return localStorage.getItem('user_type' || null);
  }

  export function isLoggedIn() {
    if(getToken() && localStorage.getItem('isLoggedIn')) {
      return true;
    }
    return false;
  }

  export function setLastPath(path) {
    localStorage.setItem('lastPath', path );
  }

  export function getLastPath() {
    return localStorage.getItem('lastPath');
  }