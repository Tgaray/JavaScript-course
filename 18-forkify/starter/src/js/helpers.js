import { TIMEOUT_SEC } from './config.js';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const getJSON = async function (url) {
  try {
    //Race to resolve the promise or otherwise timeout after ten seconds / use config variable for timeout time
    const res = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);
    const data = await res.json();
    if (!res.ok) throw new Error(`${data.message}, (${res.status})`);
    return data; //this data will be the resolved/returned value from the getJSON function within the prior promise call loadRecipe
  } catch (err) {
    throw err;
  }
};
