using System.ComponentModel.DataAnnotations;

namespace App.Models;

public class Product
{
    public int ID { get; set; }

    [Required]
    [MaxLength(32)]
    public string Name { get; set; } = string.Empty;

    public decimal Value { get; set; }

    public ICollection<ProductRawMaterial> ProductRawMaterials { get; set; } = new List<ProductRawMaterial>();
}
