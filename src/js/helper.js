import { async } from 'regenerator-runtime';
import { TIME_OUT } from './config';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const getJSON = async function (url) {
  try {
    const res = await Promise.race([fetch(url), timeout(TIME_OUT)]);

    // const res = await fetch(
    //   'https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bcc4b'
    // );

    // const res = await fetch(
    //   'https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886'
    // );
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} status(${res.status})`);
    return data;
  } catch (error) {
    throw error;
  }
};
