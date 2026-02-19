/* 
This file implements database management functionalities to be used accross the app.
*/

'use server';

import { redirect } from 'next/navigation';

import { create, read, update, remove } from '@/app/lib/data/crud';
import { setBoundaries } from '@/app/lib/misc/utils';

// Extract JSON data from response if OK, redirect to error page otherwise.
async function handleDataResponse(response) {
  if (response.ok) {
    return await response.json();
  }
  redirect(`/errors/${response.status}`);
}

// ---------------------------PRODUCTS

// Create new product.
export async function createProduct(payload: object) {
  return await create('product', payload);
}


// Fetch the number of products mathcing search criteria.
export async function readProductCount(query?: object) {
  setBoundaries('product', query);
  const response = await read('product', [ 'meta' ], query);
  return await handleDataResponse(response);
}


// Fetch products according to search criteria.
export async function readProducts(query?: object) {
  setBoundaries('product', query);
  const response = await read('product', null, query);
  return await handleDataResponse(response);
}


// Fetch particular product.
export async function readProduct(id: number) {
  const response = await read('product', [ id ]);
  return await handleDataResponse(response);
}


// Change particular product.
export async function updateProduct(id: number, payload: object) {
  return await update('product', [ id ], payload);
}


// Delete particular product.
export async function removeProduct(id: number) {
  return await remove('product', [ id ]);
}

// ---------------------------RAW MATERIALS

// Create new raw material.
export async function createRawMaterial(payload: object) {
  return await create('rawMaterial', payload);
}


// Fetch the number of raw materials mathcing search criteria.
export async function readRawMaterialCount(query?: object) {
  setBoundaries('rawMaterial', query);
  const response = await read('rawMaterial', [ 'meta' ], query);
  return await handleDataResponse(response);
}


// Fetch raw materials according to search criteria.
export async function readRawMaterials(query?: object) {
  setBoundaries('rawMaterial', query);
  const response = await read('rawMaterial', null, query);
  return await handleDataResponse(response);
}


// Fetch particular raw material.
export async function readRawMaterial(id: number) {
  const response = await read('rawMaterial', [ id ]);
  return await handleDataResponse(response);
}


// Change particular raw material.
export async function updateRawMaterial(id: number, payload: object) {
  return await update('rawMaterial', [ id ], payload);
}


// Delete particular raw material.
export async function removeRawMaterial(id: number) {
  return await remove('rawMaterial', [ id ]);
}

// ---------------------------PRODUCT RAW MATERIALS

// Create new product raw material.
export async function createProductRawMaterial(payload: object) {
  return await create('productRawMaterial', payload);
}


// Fetch particular product raw material.
export async function readProductRawMaterial(
  productId: number, rawMaterialId: number) {
  const response = await read(
    'productRawMaterial', [ productId, rawMaterialId ]);
  return await handleDataResponse(response);
}


// Change particular product raw material.
export async function updateProductRawMaterial(payload: object) {
  return await update('productRawMaterial', null, payload);
}


// Delete particular product raw material.
export async function removeProductRawMaterial(
  productId: number, rawMaterialId: number) {
  return await remove('productRawMaterial', [ productId, rawMaterialId ]);
}

// ---------------------------PRODUCTION PROJECTIONS

// Fetch particular product raw material.
export async function readProductionProjections(
  productId: number, rawMaterialId: number) {
  const response = await read('product', [ 'projections' ]);
  return await handleDataResponse(response);
}
