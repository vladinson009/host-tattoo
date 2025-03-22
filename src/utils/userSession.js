// Get user session data from local storage

function getUserSession() {
  const userData = localStorage.getItem('userData');
  if (userData) {
    return JSON.parse(userData);
  } else {
    return null;
  }
}
function setUserData(userData) {
  localStorage.setItem('userData', JSON.stringify(userData));
}
function clearUserData() {
  localStorage.removeItem('userData');
}

export { getUserSession, setUserData, clearUserData };
