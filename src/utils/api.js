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
  const baseURL = !url.includes('https') ? API_HOST + url : url;
  const qs = !isEmpty(opts.qs) ? `?${stringify(opts.qs)}` : '';
  const URL = !isEmpty(opts.qs) ? `${baseURL}${qs}` : baseURL;

  const options = {
    ...opts,
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json; charset=utf-8',
      ...opts.headers,
    }
  }

  if (opts.body) {
    options.body = JSON.stringify(opts.body)
  }

  return fetch(URL, options)
    .then(checkStatus)
    .then(parseJSON)
    .catch(err => console.error(err));
}
