'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

import {
  createRawMaterial,
  updateRawMaterial,
  removeRawMaterial
} from '@/app/lib/data/models';

import { ResponseMessages } from '@/app/lib/actions/utils';


export async function createRawMaterialAction(
  formState: object, formData: object): object {
  const form = Object.fromEntries(formData.entries());
  const dto = { name: form.name, units: form.units };

  const response = await createRawMaterial(dto);
  if (response.ok) {
    const data = await response.json();
    redirect(`/materials/${data.id}`);
  }

  return { data: form, formError: ResponseMessages.DefaultError };
}


export async function updateRawMaterialAction(
  formState: object, formData: object): object {
  const form = Object.fromEntries(formData.entries());
  const dto = { name: form.name, units: form.units };

  const response = await updateRawMaterial(form.id, dto);
  if (response.ok) {
    revalidatePath(`/materials/${form.id}`);
    return { success: ResponseMessages.ChangeSuccess };
  }

  return { formError: ResponseMessages.DefaultError };
}


export async function deleteRawMaterialAction(
  formState: object, formData: object): object {
  const form = Object.fromEntries(formData.entries());

  const response = await removeRawMaterial(form.id);
  if (response.ok) {
    redirect('/materials');
  }

  return { formError: ResponseMessages.DefaultError };
}

