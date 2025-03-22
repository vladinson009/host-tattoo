import { get, post } from './fetcher';

async function contactUsForm(formData) {
  const { topic, message, artistId } = Object.fromEntries(formData);

  if (!topic) {
    throw new Error('Topic is required');
  }
  if (!message) {
    throw new Error('Message is required!');
  }
  if (!artistId) {
    throw new Error('Artist is required!');
  }

  const me = await get('/users/me');

  const postData = {
    topic,
    message,
    customerId: {
      __type: 'Pointer',
      className: '_User',
      objectId: me.objectId,
    },
    artistId: {
      __type: 'Pointer',
      className: 'Artist',
      objectId: artistId,
    },
  };
  return post('/classes/Contact', postData);
}
async function FetchMessages(artistId, signal) {
  const { results } = await get(
    `/classes/Contact?where=${encodeURIComponent(
      JSON.stringify({
        artistId: {
          __type: 'Pointer',
          className: 'Artist',
          objectId: artistId,
        },
      })
    )}&order=-createdAt`,
    signal
  );

  return results;
}
export default {
  // send contact form to artist
  contactUsForm,

  // fetch messages for specific artist
  FetchMessages,
};
