import makeRequest from './utils/makeRequest';

export async function getChatMessages({ chatId, limit, skip }) {
  return makeRequest({
    url: `/users/messages/${chatId}?limit=${limit}&skip=${skip}`
  });
}
