import 'whatwg-fetch';
import isEmpty from 'lodash/isEmpty';
import { stringify } from 'query-string';

const API_HOST = 'http://localhost:8080';

function parseJSON(response) {
  return response.json();
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

export default function api(url, opts = {}) {
  const baseURL = !url.includes('https')
    ? API_HOST + url
    : url

  let qs = !isEmpty(opts.qs)
    ? `?${stringify(opts.qs)}`
    : ''
  
  const URL = !isEmpty(opts.qs)
    ? `${baseURL}${qs}`
    : baseURL

  return fetch(URL, opts)
    .then(checkStatus)
    .then(parseJSON)
    .catch(err => console.error(err));
}
