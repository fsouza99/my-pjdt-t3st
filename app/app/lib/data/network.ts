/*
This file implements a generic request method.

It should only be used by scripts on this same folder.
*/

'use server';

// Implements a general request function.
export async function request(method: string, url: string, payload?: object) {
  method = method.toLowerCase();
  const options = {
    method: method,
    headers: {}
  };

  if (method == 'delete' || method == 'post' || method == 'put') {
    options.headers['Content-Type'] = 'application/json';
  }

  if (payload) {
    options.body = JSON.stringify(payload);
  }

  const response = await fetch(url, options);
  return response;
}

