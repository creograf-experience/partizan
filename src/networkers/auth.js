import makeRequest from './utils/makeRequest';

export async function savePhone(phone) {
  return makeRequest({
    method: 'POST',
    url: '/users/auth/save-phone',
    body: { phone },
    withToken: false
  });
}

export async function verifyPhone(phone) {
  return makeRequest({
    method: 'POST',
    url: '/users/auth/is-verified',
    body: { phone },
    withToken: false
  });
}
