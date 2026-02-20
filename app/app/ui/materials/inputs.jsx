export default function RawMaterialInputs({ rawmat }) {
  return (
    <>
      {
        rawmat &&
          <>
            <label className="form-label" htmlFor="idInput">Código</label>
            <input
              className="form-control"
              id="idInput"
              name="id"
              type="text"
              readOnly
              defaultValue={rawmat.id} />
          </>
      }

      <label className="form-label mt-4" htmlFor="nameInput">Nome</label>
      <input
        className="form-control"
        id="nameInput"
        name="name"
        maxLength="32"
        placeholder="Ferro"
        type="text"
        required
        defaultValue={rawmat?.name} />

      <label className="form-label mt-4" htmlFor="unitsInput">Unidades</label>
      <input
        className="form-control"
        id="unitsInput"
        name="units"
        placeholder="10"
        min="0"
        step="1"
        type="number"
        required
        defaultValue={rawmat?.units} />
    </>
  );
}
