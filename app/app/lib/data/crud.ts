/*
This file implements interfaces for CRUD requests to backend controllers.

It should only be used by scripts on this same folder.
*/

'use server';

import { buildRoute } from '@/app/lib/misc/utils';
import { request } from '@/app/lib/data/network';


// POST
export async function create(controller: string, payload: object) {
  const route = buildRoute(controller);
  return await request('post', route, payload);
}


// GET
export async function read(
  controller: string,
  keys?: Array<string | number>,
  query?: object
): Promise<View | Array<View> | Number> {
  const route = buildRoute(controller, keys, query);
  return await request('get', route);
}


// PUT
export async function update(
  controller: string,
  keys: Array<string | number>,
  payload: DTO
) {
  const route = buildRoute(controller, keys);
  return await request('put', route, payload);
}


// DELETE
export async function remove(
  controller: string,
  keys: Array<string | number>
) {
  const route = buildRoute(controller, keys);
  return await request('delete', route);
}

