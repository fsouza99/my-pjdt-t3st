import Link from 'next/link';

import EmptyTableRow from '@/app/ui/misc/empty-row';
import Pagination from '@/app/ui/misc/pagination';
import Search from '@/app/ui/misc/search';
import { PageSizes } from '@/app/lib/misc/utils';
import { readRawMaterials, readRawMaterialCount } from '@/app/lib/data/models';


export default async function RawMaretialsPage(props) {
  const searchParams = await props.searchParams;
  const query = {
    name: searchParams?.query || '',
    page: Number(searchParams?.page) || 1,
  };

  const objCount = await readRawMaterialCount(query);
  const pageCount = Math.ceil(objCount / PageSizes.rawMaterial);
  const rawmats = await readRawMaterials(query);

  return (
    <>
      <h1 className="text-center mb-4">Matérias Primas</h1>
      <div className="d-flex w-fit mx-auto my-4">
        <Search placeholder="Procurar matéria" />
        <Link href="/materials/create" className="btn btn-light ms-2">
          ➕ Novo
        </Link>
      </div>
      <table className="table table-hover max-w-40rem mx-auto text-center">
        <caption className="text-center">
          Lista de materiais: clique em um para gerir e ver materiais.
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
            objCount > 0 ?
              rawmats.map((r) => (
                <tr key={r.id}>
                  <td>{r.id}</td>
                  <td><Link href={`/materials/${r.id}`}>{r.name}</Link></td>
                  <td>{r.units}</td>
                </tr>
              )) :
              <EmptyTableRow columns={3} />
          }
        </tbody>
      </table>
      {
        objCount > 0 ?
          <div className="my-4 w-fit mx-auto">
            <Pagination pageCount={pageCount} />
          </div> :
          <div className="alert alert-warning w-fit mx-auto my-4">
            <span>Nenhum resultado encontrado.</span>
          </div>
      }
    </>
  );
}
