import { TIMEOUT_SEC } from './config.js';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// default undefined because it should also work with and receive just the URL
export const AJAX = async function (url, uploadData = undefined) {
  try {
    const fetchPro = uploadData ? fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(uploadData),
    }) : fetch(url);

    //Race to resolve the promise or otherwise timeout after ten seconds / use config variable for timeout time
    const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
    const data = await res.json();
    if (!res.ok) throw new Error(`${data.message}, (${res.status})`);
    return data; //this data will be the resolved/returned value from the getJSON function within the prior promise call loadRecipe
  } catch (err) {
    throw err;
};

// export const getJSON = async function (url) {
//   try {
//     const fetchPro = fetch(url);
//     //Race to resolve the promise or otherwise timeout after ten seconds / use config variable for timeout time
//     const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
//     const data = await res.json();
//     if (!res.ok) throw new Error(`${data.message}, (${res.status})`);
//     return data; //this data will be the resolved/returned value from the getJSON function within the prior promise call loadRecipe
//   } catch (err) {
//     throw err;
//   }
// };

// export const sendJSON = async function (url, uploadData) {
//   try {
//     const fetchPro = 
//     //Race to resolve the promise or otherwise timeout after ten seconds / use config variable for timeout time
//     const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
//     const data = await res.json();

//     if (!res.ok) throw new Error(`${data.message}, (${res.status})`);
//     return data; //this data will be the resolved/returned value from the getJSON function within the prior promise call loadRecipe
//   } catch (err) {
//     throw err;
//   }
// };
