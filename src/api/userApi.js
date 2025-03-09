import { get, del, post } from './fetcher';

function registerUser(userInput) {
  const { username, email, password, rePass } = userInput;
  if (username.length < 3) {
    throw new Error('Username must be at least 3 characters long!');
  }
  if (email.length < 6) {
    throw new Error('Email must be at least 6 characters long!');
  }
  if (password.length < 6) {
    throw new Error('Password must be at least 6 characters long!');
  }
  if (password !== rePass) {
    throw new Error('Passwords do not match!');
  }
  return post('/users', 'users', { username, email, password });
}
function loginUser({ username, password }) {
  return post('/login', 'users', { username, password });
}
async function logoutUser() {
  const getToken = await get('/classes/_Session', 'users');
  const objectId = getToken.results[0].objectId;
  return del('/sessions/' + objectId, 'users');
}

export default {
  registerUser,
  loginUser,
  logoutUser,
};
