import Link from 'next/link';

import { readProductionProjections } from '@/app/lib/data/models';


export default async function ProductionProjectionsPage() {
  const projections = await readProductionProjections();

  return (
    <>
      <h1 className="text-center mb-4">Projeções</h1>
      <table className="table table-hover max-w-40rem mx-auto text-center">
        <caption className="text-center">
          Projeções de produção para estoque disponível de materiais.
        </caption>
        <thead>
          <tr>
            <th className="w-10rem">Código</th>
            <th className="w-18rem">Nome</th>
            <th className="w-10rem">Quantidade</th>
            <th className="w-10rem">Valor Unit.</th>
            <th className="w-10rem">Valor Total</th>
          </tr>
        </thead>
        <tbody>
          {
            projections.map((p) => (
              <tr key={p.id}>
                <td className="w-10rem">{p.id}</td>
                <td className="w-18rem"><Link href={`/products/${p.id}`}>{p.name}</Link></td>
                <td className="w-10rem">{p.quantity}</td>
                <td className="w-10rem">${p.unitValue}</td>
                <td className="w-10rem">${p.totalValue}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </>
  );
}