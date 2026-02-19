import EditProductForm from '@/app/ui/products/edit';
import { readProduct } from '@/app/lib/data/models';


export default async function ManageProductPage({ params }) {
  const { id } = await params;
  const product = await readProduct(id);

  return <EditProductForm product={product} />;
}
