import makeRequest from './utils/makeRequest';

export async function getUserContacts() {
  return makeRequest({ url: '/users/contacts' });
}

export async function addMany(contacts) {
  return makeRequest({
    method: 'POST',
    url: '/users/contacts',
    body: { contacts }
  });
}

export async function rate(contact, ratingValue) {
  return makeRequest({
    method: 'PUT',
    url: '/users/contacts/rate',
    body: { contact, ratingValue }
  });
}
