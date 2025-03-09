import { getUserSession } from '../utils/userSession';

const host = 'https://parseapi.back4app.com';

async function fetcher(url, method, data) {
  const userSessioin = getUserSession();
  const options = {
    method,
    headers: {
      'X-Parse-Application-Id': 'L2SkOsmzDY96yik2SKZgPI95tqnwbgBqsUdUDDeR',
      'X-Parse-REST-API-Key': 'zRh0jUoQmCUwIE6Ag0apVW6NWwHDcaHvyYSsIVNn',
      'X-Parse-Revocable-Session': 1,
    },
  };
  if (data) {
    options.headers['Content-Type'] = 'application/json';
    options.body = JSON.stringify(data);
  }
  if (userSessioin) {
    options.headers['X-Parse-Session-Token'] = userSessioin._token;
  }
  const response = await fetch(host + url, options);
  if (response.ok == false) {
    const error = await response.json();
    throw new Error(error.error);
  }
  if (response.status === 202) {
    const error = await response.json();
    throw new Error(error.error);
  }
  return response.json();
}

function get(url) {
  return fetcher(url, 'GET');
}
function post(url, data) {
  return fetcher(url, 'POST', data);
}
function put(url, data) {
  return fetcher(url, 'PUT', data);
}
function del(url) {
  return fetcher(url, 'DELETE');
}
export { get, post, put, del };
