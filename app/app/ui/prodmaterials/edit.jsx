'use client';

import Link from 'next/link';
import { useActionState } from 'react';

import PendingButton from '@/app/ui/misc/pending-btn';
import {
  deleteProductRawMaterialAction,
  updateProductRawMaterialAction
} from '@/app/lib/actions/product-materials';


export default function EditProdRawMaterialForm({ product, rawmat }) {
  const [upFormState, upFormAction, isUpPending] = useActionState(
    updateProductRawMaterialAction, {});
  const [delFormState, delFormAction, isDelPending] = useActionState(
    deleteProductRawMaterialAction, {});

  const rawmatUnits = product.rawMaterials.find((r) => r.id == rawmat.id).units;

  const isPending = isDelPending || isUpPending;

  function handleDelClick(e) {
    const confirmDelete = confirm(
      'Tem certeza de que deseja deletar essa relação entre produto e material?');
    if (confirmDelete) {
      document.getElementById('delForm').requestSubmit();
    }
  }

  return (
    <>
      <h1 className="text-center mb-4 fs-3">
        Modificar Matéria-prima em Produto
        <span className="text-secondary"> ∙ {product.id}</span>
      </h1>
      <form id="upForm" action={upFormAction} className="w-30rem max-w-90 mx-auto">
        <input name="pid" defaultValue={product.id} hidden />
        <input name="rid" defaultValue={rawmat.id} hidden />

        <label className="mt-4" htmlFor="nameInput">Nome</label>
        <input
          id="nameInput"
          className="form-control"
          name="name"
          readOnly
          defaultValue={rawmat.name} />

        <label className="mt-4" htmlFor="unitsInput">Unidades</label>
        <input
          id="unitsInput"
          className="form-control"
          min="1"
          name="units"
          defaultValue={rawmatUnits}
          step="1"
          type="number" />
      </form>
      <form id="delForm" action={delFormAction} hidden>
        <input name="pid" defaultValue={product.id} />
        <input name="rid" defaultValue={rawmat.id} />
      </form>
      <div className="mt-4 text-center">
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
      <div className="text-center my-4">
        <Link href={`/products/${product.id}/materials`} className="mx-auto">
          Ver materiais do produto
        </Link>
      </div>
    </>
  );
}
