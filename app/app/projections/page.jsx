import Link from 'next/link';

import { readProductionProjections } from '@/app/lib/data/models';


export default async function ProductionProjectionsPage() {
  const projections = await readProductionProjections();

  return (
    <>
      <h1 className="text-center mb-4">Projeções</h1>
      <table className="table table-hover max-w-90 w-40rem mx-auto text-center">
        <caption className="text-center">
          Ranking de projeções de produção para estoque disponível de materiais.
        </caption>
        <thead>
          <tr>
            <th className="w-10rem">Código</th>
            <th className="w-18rem">Nome</th>
            <th className="w-10rem">Unid.</th>
            <th className="w-10rem">Valor Unit.</th>
            <th className="w-10rem">Total</th>
          </tr>
        </thead>
        <tbody>
          {
            projections.map((p) => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td><Link href={`/products/${p.id}`}>{p.name}</Link></td>
                <td>{p.quantity}</td>
                <td>${p.unitValue}</td>
                <td>${p.totalValue}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </>
  );
}