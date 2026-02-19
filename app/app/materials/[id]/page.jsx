import EditRawMaterialForm from '@/app/ui/materials/edit';
import { readRawMaterial } from '@/app/lib/data/models';


export default async function ManageRawMaterialPage({ params }) {
  const { id } = await params;
  const rawmat = await readRawMaterial(id);

  return <EditRawMaterialForm rawmat={rawmat} />;
}
