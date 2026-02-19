using App.StaticTools.Validation;
using System.ComponentModel.DataAnnotations;

namespace App.Models;

public record ProductDto(
	[Required]
	[MaxLength(32)]
	string name,
	
	[CustomValidation(typeof(Numbers), nameof(Numbers.IsValueNonNegative))]
	decimal value
);
