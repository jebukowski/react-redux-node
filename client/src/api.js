import fetch from 'isomorphic-fetch';

// do not need full path due to proxy
let authenticatePath = '/auth/authenticate';
let verifyPath = '/auth/verify';
let detailsPath = '/api/details';

// must provide full path while testing API
if (process.env.NODE_ENV === 'test') {
  const path = 'http://localhost:8080'
  
  authenticatePath = `${path}${authenticatePath}`;
  verifyPath = `${path}${verifyPath}`;
  detailsPath = `${path}${detailsPath}`;
}

// Fetch does not reject promise for HTTP 4xx or 5xx server responses. Must check response status.
const checkResponseStatus = (response, potentialErrorStatus) => {
  if (response.status >= potentialErrorStatus) {
    // Read response stream to receive error message from API
    return response.text()
      .then(message => { throw new Error(message) });
  };

  // no error
  return response;
};

const parseJSON = response => response.json();

// api.authenticate
export const authenticate = (username, password) => {
  return fetch(authenticatePath, {
    method: 'POST',
    headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  })
  .then(response => checkResponseStatus(response, 401))
  .then(parseJSON);
};

// api.verify
export const verify = (token) => {
  return fetch(verifyPath, {
    method: 'POST',
    headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
    body: JSON.stringify({ token }),
  })
  .then(response => checkResponseStatus(response, 403))
  .then(parseJSON);
};

// api.details
export const details = () => {
  return fetch(detailsPath, {
    method: 'GET',
    headers: { 'Accept': 'application/json' },
  })
  .then(response => checkResponseStatus(response, 400))
  .then(parseJSON);
};
