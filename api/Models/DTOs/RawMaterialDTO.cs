using System.ComponentModel.DataAnnotations;

namespace App.Models;

public record RawMaterialDto(
	[Required]
	[MaxLength(32)]
	string name,

	uint units
);
