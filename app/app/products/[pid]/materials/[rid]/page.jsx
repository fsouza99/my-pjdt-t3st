import EditProdRawMaterialForm from '@/app/ui/prodmaterials/edit';
import { readProduct, readRawMaterial } from '@/app/lib/data/models';


export default async function ManageRawMaterialPage({ params }) {
  const { pid, rid } = await params;
  const product = await readProduct(pid);
  const rawmat = await readRawMaterial(rid);

  return <EditProdRawMaterialForm product={product} rawmat={rawmat} />;
}
