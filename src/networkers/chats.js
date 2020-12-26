import makeRequest from './utils/makeRequest';

export async function getUserChats() {
  return makeRequest({ url: '/users/chats' });
}

export async function permaBan({ userPhone, mirrorPhone, chatId }) {
  return makeRequest({
    method: 'POST',
    url: '/users/chats/perma-ban',
    body: { userPhone, mirrorPhone, chatId }
  });
}
