import Link from 'next/link';

import EmptyTableRow from '@/app/ui/misc/empty-row';
import Pagination from '@/app/ui/misc/pagination';
import Search from '@/app/ui/misc/search';
import { PageSizes } from '@/app/lib/misc/utils';
import { readProducts, readProductCount } from '@/app/lib/data/models';


export default async function ProductsPage(props) {
  const searchParams = await props.searchParams;
  const query = {
    name: searchParams?.query || '',
    page: Number(searchParams?.page) || 1,
  };

  const objCount = await readProductCount(query);
  const pageCount = Math.ceil(objCount / PageSizes.product);
  const products = await readProducts(query);

  return (
    <>
      <h1 className="text-center mb-4">Produtos</h1>
      <div className="d-flex w-fit mx-auto my-4">
        <Search placeholder="Procurar produto" />
        <Link href="/products/create" className="btn btn-light ms-2">
          ➕ Novo
        </Link>
      </div>
      <table className="table table-hover max-w-40rem mx-auto text-center">
        <caption className="text-center">
          Lista de produtos: clique em um para gerir e ver materiais.
        </caption>
        <thead>
          <tr>
            <th className="w-10rem">Código</th>
            <th className="w-18rem">Nome</th>
            <th className="w-10rem">Valor</th>
          </tr>
        </thead>
        <tbody>
          {
            objCount > 0 ?
              products.map((p) => (
                <tr key={p.id}>
                  <td>{p.id}</td>
                  <td><Link href={`/products/${p.id}`}>{p.name}</Link></td>
                  <td>${p.value}</td>
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