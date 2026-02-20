import EditProductForm from '@/app/ui/products/edit';
import { readProduct } from '@/app/lib/data/models';


export default async function ManageProductPage({ params }) {
  const { pid } = await params;
  const product = await readProduct(pid);

  return <EditProductForm product={product} />;
}
