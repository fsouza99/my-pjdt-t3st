'use client';

import Link from 'next/link';
import { useActionState } from 'react';

import PendingButton from '@/app/ui/misc/pending-btn';
import ProductInputs from '@/app/ui/products/inputs';
import {
  deleteProductAction,
  updateProductAction
} from '@/app/lib/actions/products';


export default function EditProductForm({ product }) {
  const [upFormState, upFormAction, isUpPending] = useActionState(
    updateProductAction, {});
  const [delFormState, delFormAction, isDelPending] = useActionState(
    deleteProductAction, {});

  const isPending = isDelPending || isUpPending;

  function handleDelClick(e) {
    const confirmDelete = confirm(
      'Tem certeza de que deseja deletar esse produto?');
    if (confirmDelete) {
      document.getElementById('delForm').requestSubmit();
    }
  }

  return (
    <>
      <h1 className="text-center my-4 fs-3">
        Produto<span className="text-secondary"> ∙ {product.id}</span>
      </h1>
      <form id="upForm" action={upFormAction} className="w-18rem mx-auto" >
        <ProductInputs product={product} />
      </form>
      <form id="delForm" action={delFormAction} hidden>
        <input name="id" defaultValue={product.id} />
      </form>
      <div className="mt-4 text-center">
        <Link href={`/products/${product.id}/materials`}>Ver materiais</Link>
        <div className="my-4" />
        <PendingButton
          className="me-1 btn btn-success"
          disabled={isPending}
          formId="upForm"
          idleLabel="SALVAR"
          pending={isUpPending}
          pendingLabel="ENVIANDO"
          type="submit" />
        <PendingButton
          className="btn btn-danger"
          disabled={isPending}
          formId="delForm"
          idleLabel="DELETAR"
          onClick={handleDelClick}
          pending={isDelPending}
          pendingLabel="DELETANDO"
          type="button" />
      </div>
      {
        upFormState.success &&
          <div className="alert alert-success w-fit mx-auto mt-4">
            <small>{upFormState.success}</small>
          </div>
      }
      {
        upFormState.formError &&
          <div className="alert alert-danger w-fit mx-auto mt-4">
            <small>{upFormState.formError}</small>
          </div>
      }
      {
        delFormState.formError &&
          <div className="alert alert-danger w-fit mx-auto mt-4">
            <small>{delFormState.formError}</small>
          </div>
      }
    </>
  );
}
