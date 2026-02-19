import BootstrapClient from '@/app/ui/misc/bs-client';
import Footer from "@/app/ui/misc/footer";
import Navbar from '@/app/ui/misc/navbar';

import 'bootstrap/dist/css/bootstrap.css';
import '@/app/globals.css';


export const metadata = {
  title: "Product & Materials MGM",
  description: "Web application for management of products and raw materials."
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

