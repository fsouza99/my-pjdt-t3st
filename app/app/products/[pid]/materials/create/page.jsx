import CreateProdRawMaterialForm from '@/app/ui/prodmaterials/create';
import { readProduct, readRawMaterials } from '@/app/lib/data/models';


export default async function CreateProdRawMaterialPage({ params }) {
  const { pid } = await params;
  const product = await readProduct(pid);
  const rawmats = await readRawMaterials();

  return <CreateProdRawMaterialForm product={product} rawmats={rawmats} />;
}
