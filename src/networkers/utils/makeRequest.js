import getHeaders from './headers';
import * as config from '../../config';

async function makeRequest({
  method = 'GET',
  url,
  body = null,
  withToken = true
}) {
  let requestOptions = {
    method,
    headers: await getHeaders(withToken)
  };

  if (body) {
    requestOptions.body = JSON.stringify(body);
  }

  const requestUrl = config.apiUrl + url;
  const res = await fetch(requestUrl, requestOptions);
  return res.json();
}

export default makeRequest;
