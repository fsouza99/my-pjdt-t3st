'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

import {
  createProduct,
  updateProduct,
  removeProduct
} from '@/app/lib/data/models';

import { ResponseMessages } from '@/app/lib/actions/utils';


export async function createProductAction(formState: object, formData: object
): object {
  const form = Object.fromEntries(formData.entries());
  const dto = { name: form.name, value: form.value };

  const response = await createProduct(dto);
  if (response.ok) {
    const data = await response.json();
    redirect(`/products/${data.id}`);
  }

  return { formError: ResponseMessages.DefaultError };
}


export async function updateProductAction(formState: object, formData: object
): object {
  const form = Object.fromEntries(formData.entries());
  const dto = { name: form.name, value: form.value };

  const response = await updateProduct(form.id, dto);
  if (response.ok) {
    revalidatePath(`/products/${form.id}`);
    return { success: ResponseMessages.ChangeSuccess };
  }

  return { formError: ResponseMessages.DefaultError };
}


export async function deleteProductAction(formState: object, formData: object
): object {
  const form = Object.fromEntries(formData.entries());

  const response = await removeProduct(form.id);
  if (response.ok) {
    redirect('/products');
  }

  return { formError: ResponseMessages.DefaultError };
}

