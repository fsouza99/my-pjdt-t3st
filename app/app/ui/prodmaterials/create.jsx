'use client';

import Link from 'next/link';
import { useActionState } from 'react';

import PendingButton from '@/app/ui/misc/pending-btn';
import {
  createProductRawMaterialAction
} from '@/app/lib/actions/product-materials';


export default function CreateProdRawMaterialForm({ product, rawmats }) {
  const [formState, formAction, isPending] = useActionState(
    createProductRawMaterialAction, {});

  return (
    <>
      <h1 className="text-center mb-4 fs-3">
        Adicionar Matéria-prima ao Produto<span className="text-secondary"> ∙ {product.id}</span>
      </h1>
      <form action={formAction} className="w-30rem max-w-90 mx-auto">
        <input name="pid" defaultValue={product.id} hidden />

        <label htmlFor="materialInput">Matéria-prima</label>
        <select id="materialInput" name="rid" className="form-select">
          {
            rawmats.map((r) => (
              <option key={r.id} value={r.id}>{r.name}</option>
            ))
          }
        </select>

        <label className="mt-4" htmlFor="unitsInput">Unidades</label>
        <input
          id="unitsInput"
          className="form-control"
          min="1"
          name="units"
          defaultValue="1"
          step="1"
          type="number" />

        <div className="text-center">
          <PendingButton
            className="mt-4 me-1 btn btn-success"
            disabled={isPending}
            idleLabel="SALVAR"
            pending={isPending}
            pendingLabel="ENVIANDO"
            type="submit" />
        </div>
      </form>
      {
        formState.success &&
          <div className="alert alert-success w-fit mx-auto mt-4">
            <small>{formState.success}</small>
          </div>
      }
      {
        formState.formError &&
          <div className="alert alert-danger w-fit mx-auto mt-4">
            <small>{formState.formError}</small>
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
