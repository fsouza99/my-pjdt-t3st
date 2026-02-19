using System.ComponentModel.DataAnnotations;

namespace App.Models;

public class RawMaterial
{
    public int ID { get; set; }

    [Required]
    [MaxLength(32)]
    public string Name { get; set; } = string.Empty;

    public uint Units { get; set; }
}
