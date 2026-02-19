'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

import clsx from 'clsx';


export default function Pagination({ pageCount }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;

  const createPageURL = (pageNumber) => {
    const params = new URLSearchParams(searchParams);
    if (pageNumber) {
      params.set('page', pageNumber.toString());
    }
    return `${pathname}?${params.toString()}`;
  };

  return (
    <nav aria-label="Navegação de resultados">
      <ul className="pagination">
        {
          currentPage > 1 &&
          <>
            <li className="page-item">
              <Link className="page-link" href={createPageURL(1)}>
                1
              </Link>
            </li>
            <li className="page-item">
              <Link className="page-link" href={createPageURL(currentPage - 1)}>
                &lt;
              </Link>
            </li>
          </>
        }
        <li className="page-item active">
          <a className="page-link" href="#" aria-current="page">{currentPage}</a>
        </li>
        {
          currentPage < pageCount &&
          <>
            <li className="page-item">
              <Link className="page-link" href={createPageURL(currentPage + 1)}>
                &gt;
              </Link>
            </li>
            <li className="page-item">
              <Link className="page-link" href={createPageURL(pageCount)}>
                {pageCount}
              </Link>
            </li>
          </>
        }
      </ul>
    </nav>
  );
}

