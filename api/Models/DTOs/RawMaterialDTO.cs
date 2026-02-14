using System.ComponentModel.DataAnnotations;

namespace App.Models;

public record RawMaterialDto([Required] string name, uint units);
