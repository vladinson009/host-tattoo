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

export default {
  contactUsForm,
};
