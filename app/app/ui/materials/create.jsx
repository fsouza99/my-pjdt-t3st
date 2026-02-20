'use client';

import { useActionState } from 'react';

import PendingButton from '@/app/ui/misc/pending-btn';
import RawMaterialInputs from '@/app/ui/materials/inputs';
import { createRawMaterialAction } from '@/app/lib/actions/materials';


export default function CreateRawMaterialForm() {
  const [formState, formAction, isPending] = useActionState(
    createRawMaterialAction, {});

  return (
    <>
      <h1 className="text-center fs-3">Nova Matéria-prima</h1>
      <form action={formAction} className="w-30rem max-w-90 mx-auto" >
        <RawMaterialInputs />
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
