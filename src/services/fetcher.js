import { clearUserData, getUserSession } from '../utils/userSession';

// TEMP KEYS FOR PROJECT DEFENSE
//TODO: Move keys to .env variable
const host = 'https://parseapi.back4app.com';
const xParseApplication = 'L2SkOsmzDY96yik2SKZgPI95tqnwbgBqsUdUDDeR';
const xParseRestApiKey = 'zRh0jUoQmCUwIE6Ag0apVW6NWwHDcaHvyYSsIVNn';
const xParseRevocableSession = 1;

let navigateFunction = null;
export const setNavigate = (navigate) => (navigateFunction = navigate);

async function fetcher(url, method, data, signal) {
  const userSessioin = getUserSession();

  //Setted app keys in headers, method and signal
  const options = {
    method,
    headers: {
      'X-Parse-Application-Id': xParseApplication,
      'X-Parse-REST-API-Key': xParseRestApiKey,
      'X-Parse-Revocable-Session': xParseRevocableSession,
    },
    signal,
  };
  //In case of body data, check also if it is Instance of File or JSON
  if (data) {
    options.headers['Content-Type'] = 'application/json';
    if (data instanceof File) {
      options.body = data;
    } else {
      options.body = JSON.stringify(data);
    }
  }
  // If user is logged in, set session token from local storage in headers
  if (userSessioin) {
    options.headers['X-Parse-Session-Token'] = userSessioin._token;
  }
  const response = await fetch(host + url, options);

  if (response.ok == false) {
    const error = await response.json();
    // If session token is invalid, clear local storage and redirect to home page
    if (error.code === 209) {
      clearUserData();
      alert(error.error);
      if (navigateFunction) {
        navigateFunction('/');
        return;
      }
    }
    throw new Error(error.error);
  }
  // if username is taken => status code 202
  if (response.status === 202) {
    const error = await response.json();
    throw new Error(error.error);
  }
  return response.json();
}

// Abstracted fetcher methods
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
