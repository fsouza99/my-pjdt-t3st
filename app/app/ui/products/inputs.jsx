export default function ProductInputs({ product }) {
  return (
    <>
      {
        product &&
          <>
            <label className="form-label" htmlFor="idInput">Código</label>
            <input
              className="form-control"
              id="idInput"
              name="id"
              type="text"
              readOnly
              defaultValue={product.id} />
          </>
      }

      <label className="form-label mt-4" htmlFor="nameInput">Nome</label>
      <input
        className="form-control"
        id="nameInput"
        name="name"
        placeholder="Ferro"
        type="text"
        required
        defaultValue={product?.name} />

      <label className="form-label mt-4" htmlFor="valueInput">Value</label>
      <input
        className="form-control"
        id="valueInput"
        name="value"
        placeholder="10"
        min="0.01"
        step="0.01"
        type="number"
        required
        defaultValue={product?.value} />
    </>
  );
}
