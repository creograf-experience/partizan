import makeRequest from './utils/makeRequest';

export async function add(token) {
  return makeRequest({
    method: 'POST',
    url: '/users/pushtoken',
    body: { token }
  });
}
