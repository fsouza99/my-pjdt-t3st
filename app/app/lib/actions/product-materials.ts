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
    productId: form.productId,
    rawMaterialId: form.rawMaterialId,
    units: form.units
  };

  const response = await createProductRawMaterial(dto);
  if (response.ok) {
    redirect(`/products/${dto.productId}`);
  }

  return { data: form, formError: ResponseMessages.DefaultError };
}


export async function updateProductRawMaterialAction(
  formState: object, formData: object): object {
  const form = Object.fromEntries(formData.entries());
  const dto = {
    productId: form.productId,
    rawMaterialId: form.rawMaterialId,
    units: form.units
  };

  const response = await updateProductRawMaterial(dto);
  if (response.ok) {
    revalidatePath(`/products/${form.productId}/edit`);
    return { success: ResponseMessages.ChangeSuccess };
  }

  return { formError: ResponseMessages.DefaultError };
}


export async function deleteProductRawMaterialAction(
  formState: object, formData: object): object {
  const form = Object.fromEntries(formData.entries());

  const response = await removeProductRawMaterial(
    form.productId, form.rawMaterialId);
  if (response.ok) {
    return { success: ResponseMessages.DeleteSuccess };
  }

  return { formError: ResponseMessages.DefaultError };
}

