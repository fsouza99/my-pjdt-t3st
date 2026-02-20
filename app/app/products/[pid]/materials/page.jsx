import Link from 'next/link';

import EmptyTableRow from '@/app/ui/misc/empty-row';
import { readProduct } from '@/app/lib/data/models';


export default async function ProdMaterialsPage({ params }) {
  const { pid } = await params;
  const product = await readProduct(pid);

  return (
    <>
      <h1 className="text-center mb-4 fs-3">Materiais em Produto<span> ∙ {product.id}</span></h1>
      <div className="my-4 text-center">
        <Link
          href={`/products/${pid}/materials/create`}
          className="btn btn-light">
          ➕ Adicionar matéria prima
        </Link>
      </div>
      <table className="table table-hover max-w-30rem mx-auto text-center">
        <caption className="text-center">
          Matérias primas utilizadas no produto.
        </caption>
        <thead>
          <tr>
            <th className="w-10rem">Código</th>
            <th className="w-18rem">Nome</th>
            <th className="w-10rem">Unidades</th>
          </tr>
        </thead>
        <tbody>
          {
            product.rawMaterials.length > 0 ?
              product.rawMaterials.map((r) => (
                <tr key={r.id}>
                  <td>{r.id}</td>
                  <td>
                    <Link href={`/products/${product.id}/materials/${r.id}`}>
                      {r.name}
                    </Link>
                  </td>
                  <td>{r.units}</td>
                </tr>
              )) :
              <EmptyTableRow columns={3} />
          }
        </tbody>
      </table>
    </>
  );
}