import { clearUserData, getUserSession } from '../utils/userSession';

// TEMP KEYS FOR PROJECT DEFENSE
//TODO: Move keys to .env variable
const host = 'https://parseapi.back4app.com';
const xParseApplication = 'L2SkOsmzDY96yik2SKZgPI95tqnwbgBqsUdUDDeR';
const xParseRestApiKey = 'zRh0jUoQmCUwIE6Ag0apVW6NWwHDcaHvyYSsIVNn';
const xParseRevocableSession = 1;

async function fetcher(url, method, data, signal) {
  const userSessioin = getUserSession();
  const options = {
    method,
    headers: {
      'X-Parse-Application-Id': xParseApplication,
      'X-Parse-REST-API-Key': xParseRestApiKey,
      'X-Parse-Revocable-Session': xParseRevocableSession,
    },
    signal,
  };
  if (data) {
    options.headers['Content-Type'] = 'application/json';
    if (data instanceof File) {
      options.body = data;
    } else {
      options.body = JSON.stringify(data);
    }
  }
  if (userSessioin) {
    options.headers['X-Parse-Session-Token'] = userSessioin._token;
  }
  const response = await fetch(host + url, options);

  if (response.ok == false) {
    const error = await response.json();
    if (error.code === 209) {
      clearUserData();
      alert(error.error);
      window.location = '/';
      return;
    }
    throw new Error(error.error);
  }
  if (response.status === 202) {
    const error = await response.json();
    throw new Error(error.error);
  }
  return response.json();
}

function get(url, signal) {
  return fetcher(url, 'GET', null, signal);
}
function post(url, data, signal) {
  return fetcher(url, 'POST', data, signal);
}
function put(url, data, signal) {
  return fetcher(url, 'PUT', data, signal);
}
function del(url, signal) {
  return fetcher(url, 'DELETE', null, signal);
}
export { get, post, put, del };
