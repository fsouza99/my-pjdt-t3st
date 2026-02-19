'use client';

import { useActionState } from 'react';

import PendingButton from '@/app/ui/misc/pending-btn';
import RawMaterialInputs from '@/app/ui/materials/inputs';
import {
  deleteRawMaterialAction,
  updateRawMaterialAction
} from '@/app/lib/actions/materials';


export default function EditRawMaterialForm({ rawmat }) {
  const [upFormState, upFormAction, isUpPending] = useActionState(
    updateRawMaterialAction, {});
  const [delFormState, delFormAction, isDelPending] = useActionState(
    deleteRawMaterialAction, {});

  const isPending = isDelPending || isUpPending;

  function handleDelClick(e) {
    const confirmDelete = confirm(
      'Tem certeza de que deseja deletar esse material?');
    if (confirmDelete) {
      document.getElementById('delForm').requestSubmit();
    }
  }

  return (
    <>
      <h1 className="text-center my-4 fs-3">
        Matéria Prima<span className="text-secondary"> ∙ {rawmat.id}</span>
      </h1>
      <form id="upForm" action={upFormAction} className="w-18rem mx-auto" >
        <RawMaterialInputs rawmat={rawmat} />
      </form>
      <form id="delForm" action={delFormAction} hidden>
        <input name="id" defaultValue={rawmat.id} />
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
    </>
  );
}
