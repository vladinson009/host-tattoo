import { get, del, post, put } from './fetcher';

function registerUser(userInput, signal) {
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
  return post('/users', userData, signal);
}
function loginUser({ username, password }, signal) {
  const userData = {
    username: username.trim().toLowerCase(),
    password: password.trim(),
  };
  return post('/login', userData, signal);
}
async function logoutUser(signal) {
  const getToken = await get('/classes/_Session', signal);
  const objectId = getToken.results[0].objectId;
  return del('/sessions/' + objectId);
}
function retrieveUser(signal) {
  return get('/users/me', signal);
}
// ! checkUserRole RETURNS OBJECT, with key 'results' - array with Objects
//  results[0].name - is the role name

async function toggleFavorite(tattooId, signal) {
  const me = await retrieveUser();
  const operation = me.favorite.some((el) => el == tattooId)
    ? 'Remove'
    : 'AddUnique';

  const body = {
    favorite: {
      __op: operation,
      objects: [tattooId],
    },
  };
  return put(`/classes/_User/${me.objectId}`, body, signal);
}
function checkUserRoles(userId, signal) {
  return get(
    `/classes/_Role?where=${encodeURIComponent(
      JSON.stringify({
        users: {
          __type: 'Pointer',
          className: '_User',
          objectId: userId,
        },
      })
    )}`,
    signal
  );
}
// ! checkSpecificUserRole RETURNS OBJECT, with key 'results' - array with Objects
//  results[0].name - is the role name
function checkSpecificUserRole(userId, roleName, signal) {
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
    )}`,
    signal
  );
}
function addNewArtist(userId, signal) {
  return put(
    `/classes/_Role/bvD454fsf0`,
    {
      users: {
        __op: 'AddRelation',
        objects: [{ __type: 'Pointer', className: '_User', objectId: userId }],
      },
    },
    signal
  );
}
export default {
  //authentications
  registerUser,
  loginUser,
  logoutUser,
  //get current user
  retrieveUser,
  //favorite
  toggleFavorite,
  //check user for roles
  checkUserRoles,
  checkSpecificUserRole,

  // add new user in artist role
  addNewArtist,
};
