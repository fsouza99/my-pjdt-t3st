'use client';

import Link from 'next/link';


export default function Navbar() {
  return (
    <header>
      <nav className="navbar navbar-expand-lg py-2 border">
        <div className="container-fluid">
          <span className="navbar-brand ms-4">
            Projedata<small className="text-secondary"> • Teste</small>
          </span>
          <button
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Exibir menu de navegação."
            className="navbar-toggler"
            data-bs-target="#navbarNavAltMarkup"
            data-bs-toggle="collapse"
            type="button">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse mx-4"
            id="navbarNavAltMarkup">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item mx-1">
                <Link className="nav-link" href="/about">Sobre</Link>
              </li>
              <li className="nav-item mx-1">
                <Link className="nav-link" href="/products">Produtos</Link>
              </li>
              <li className="nav-item mx-1">
                <Link className="nav-link" href="/materials">Materiais</Link>
              </li>
              <li className="nav-item mx-1">
                <Link className="nav-link" href="/projections">Projeções</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

