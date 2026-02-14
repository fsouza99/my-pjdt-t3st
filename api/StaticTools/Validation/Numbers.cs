using System.ComponentModel.DataAnnotations;

namespace App.StaticTools.Validation;

public static class Numbers
{
    public static ValidationResult IsValueNonNegative(decimal number)
    {
        if (number >= 0)
        {
            return ValidationResult.Success!;
        }
        return new ValidationResult("Values must be non-negative.");
    }
}
