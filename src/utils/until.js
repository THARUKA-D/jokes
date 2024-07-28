const getAuthToken = () => {
  return window.sessionStorage.getItem("jwt");
}

module.exports = { getAuthToken };
