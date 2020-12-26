import makeRequest from './utils/makeRequest';

export async function notifyContacts() {
  return makeRequest({ url: '/notifications/notify-contacts' });
}
