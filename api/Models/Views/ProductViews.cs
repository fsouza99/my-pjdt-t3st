namespace App.Models;

public record ProductView(
    int id,
    string name,
    decimal value,
    ICollection<ProductNamedRawMaterialView> rawMaterials);

public record SimpleProductView(int id, string name, decimal value);

public record ProductProfitProjectionView(
    int id, string name, uint quantity, decimal unitValue, decimal totalValue);
