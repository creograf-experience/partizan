import makeRequest from './utils/makeRequest';

export async function getUserProfile() {
  return makeRequest({ url: '/users/profile' });
}

export async function getUserRating() {
  return makeRequest({ url: '/users/profile/rating' });
}

export async function editUserProfile(profileId) {
  return makeRequest({
    method: 'PUT',
    url: '/users/profile',
    body: { profileId }
  });
}

export async function setUserProfile({ profileId, phone }) {
  return makeRequest({
    method: 'POST',
    url: '/users/profile',
    body: { profileId, phone },
    withToken: false
  });
}

export async function getAll() {
  return makeRequest({
    url: '/profiles',
    withToken: false
  });
}

export async function editPublicProfile({ firstName, lastName, avatar }) {
  return makeRequest({
    method: 'PUT',
    url: '/users/profile/public',
    body: { firstName, lastName, avatar }
  });
}
