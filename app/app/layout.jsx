import BootstrapClient from '@/app/ui/misc/bs-client';
import Footer from "@/app/ui/misc/footer";
import Navbar from '@/app/ui/misc/navbar';

import 'bootstrap/dist/css/bootstrap.css';
import '@/app/globals.css';


export const metadata = {
  title: "Produtos & Materiais",
  description: "Aplicação web para gestão de produtos e matérias-primas."
};


export default async function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>
        <Navbar />
        <main className="container py-4">
          {children}
        </main>
        <Footer />
      </body>
      <BootstrapClient />
    </html>
  );
}

