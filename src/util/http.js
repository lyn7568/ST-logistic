import axios from 'axios'
import Vue from 'vue'

axios.defaults.baseURL = window.cfg.baseurl;

axios.get = function(url, params, options = {}) {
  return axios({
    url,
    params,
    method: 'GET',
  }).catch(err => { handleError(err); })
}

axios.post = function(url, data, options = {}) {
  return axios({
    url,
    data,
    method: 'POST',
    headers: {
      // ['Content-Type']: 'application/x-www-form-urlencoded',
      ...options.headers
    }
  }).catch(err => { handleError(err); })
}

function handleError(err) {
  console.log(err);
}

Vue.prototype.$http = axios;