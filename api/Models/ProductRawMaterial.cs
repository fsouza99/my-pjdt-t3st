using Microsoft.EntityFrameworkCore;

namespace App.Models;

[PrimaryKey(nameof(ProductID), nameof(RawMaterialID))]
public class ProductRawMaterial
{
    public int ProductID { get; set; }
    public int RawMaterialID { get; set; }
    public uint Units { get; set; }

    public Product Product { get; set; } = default!;
    public RawMaterial RawMaterial { get; set; } = default!;
}
