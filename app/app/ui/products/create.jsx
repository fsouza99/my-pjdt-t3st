'use client';

import { useActionState } from 'react';

import PendingButton from '@/app/ui/misc/pending-btn';
import ProductInputs from '@/app/ui/products/inputs';
import { createProductAction } from '@/app/lib/actions/products';


export default function CreateProductForm() {
  const [formState, formAction, isPending] = useActionState(
    createProductAction, {});

  return (
    <>
      <h1 className="text-center fs-3">Novo Produto</h1>
      <form action={formAction} className="w-18rem mx-auto">
        <ProductInputs />
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
    </>
  );
}
