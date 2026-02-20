'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

import {
  createProductRawMaterial,
  updateProductRawMaterial,
  removeProductRawMaterial
} from '@/app/lib/data/models';

import { ResponseMessages } from '@/app/lib/actions/utils';


export async function createProductRawMaterialAction(
  formState: object, formData: object): object {
  const form = Object.fromEntries(formData.entries());
  const dto = {
    productID: form.pid,
    rawMaterialID: form.rid,
    units: form.units
  };

  const response = await createProductRawMaterial(dto);
  if (response.ok) {
    redirect(`/products/${dto.productID}/materials`);
  }

  const text = await response.text();
  if (text.includes('UNIQUE')) {
    return { formError: ResponseMessages.UniqueConstError };  
  }

  return { formError: ResponseMessages.DefaultError };
}


export async function updateProductRawMaterialAction(
  formState: object, formData: object): object {
  const form = Object.fromEntries(formData.entries());
  const dto = {
    productID: form.pid,
    rawMaterialID: form.rid,
    units: form.units
  };

  const response = await updateProductRawMaterial(dto);
  if (response.ok) {
    revalidatePath(`/products/${dto.productID}/materials/${dto.rawMaterialID}`);
    return { success: ResponseMessages.ChangeSuccess };
  }

  return { formError: ResponseMessages.DefaultError };
}


export async function deleteProductRawMaterialAction(
  formState: object, formData: object): object {
  const form = Object.fromEntries(formData.entries());

  const response = await removeProductRawMaterial(form.pid, form.rid);
  if (response.ok) {
    redirect(`/products/${form.pid}/materials`);
  }

  return { formError: ResponseMessages.DefaultError };
}

