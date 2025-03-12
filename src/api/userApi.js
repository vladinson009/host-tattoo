import { get, del, post, put } from './fetcher';

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
  const userData = {
    username: username.trim(),
    email: email.trim(),
    password: password.trim(),
  };
  return post('/users', userData);
}
function loginUser({ username, password }) {
  const userData = {
    username: username.trim().toLowerCase(),
    password: password.trim(),
  };
  return post('/login', userData);
}
async function logoutUser() {
  const getToken = await get('/classes/_Session', 'users');
  const objectId = getToken.results[0].objectId;
  return del('/sessions/' + objectId);
}
function retrieveUser() {
  return get('/users/me');
}
// ! checkUserRole RETURNS OBJECT, with key 'results' - array with Objects
//  results[0].name - is the role name

function checkUserRoles(userId) {
  return get(
    `/classes/_Role?where=${encodeURIComponent(
      JSON.stringify({
        users: {
          __type: 'Pointer',
          className: '_User',
          objectId: userId,
        },
      })
    )}`
  );
}
// ! checkSpecificUserRole RETURNS OBJECT, with key 'results' - array with Objects
//  results[0].name - is the role name
function checkSpecificUserRole(userId, roleName) {
  return get(
    `/classes/_Role?where=${encodeURIComponent(
      JSON.stringify({
        name: roleName,
        users: {
          __type: 'Pointer',
          className: '_User',
          objectId: userId,
        },
      })
    )}`
  );
}
function addNewArtist(userId) {
  return put(`/classes/_Role/bvD454fsf0`, {
    users: {
      __op: 'AddRelation',
      objects: [{ __type: 'Pointer', className: '_User', objectId: 'BJu6irGSvt' }],
    },
  });
}
async function getArtists() {
  const result = await get(
    `/classes/_User?where={"$relatedTo":{"object":{"__type":"Pointer","className":"_Role","objectId":"bvD454fsf0"},"key":"users"}}`
  );
  return result.results;
}

export default {
  registerUser,
  loginUser,
  logoutUser,
  retrieveUser,
  checkUserRoles,
  checkSpecificUserRole,
  addNewArtist,
  getArtists,
};
