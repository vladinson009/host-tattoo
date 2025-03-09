import { getUserSession } from '../utils/userSession';

const host = 'https://parseapi.back4app.com';

async function fetcher(url, collection, method, data) {
  const userSessioin = getUserSession();
  const options = {
    method,
    headers: {},
  };
  if (collection == 'users') {
    options.headers['X-Parse-Application-Id'] =
      'L2SkOsmzDY96yik2SKZgPI95tqnwbgBqsUdUDDeR';
    options.headers['X-Parse-REST-API-Key'] =
      'zRh0jUoQmCUwIE6Ag0apVW6NWwHDcaHvyYSsIVNn';
    options.headers['X-Parse-Revocable-Session'] = 1;
  }
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

function get(url, collection) {
  return fetcher(url, collection, 'GET');
}
function post(url, collection, data) {
  return fetcher(url, collection, 'POST', data);
}
function put(url, collection, data) {
  return fetcher(url, collection, 'PUT', data);
}
function del(url, collection) {
  return fetcher(url, collection, 'DELETE');
}
export { get, post, put, del };
