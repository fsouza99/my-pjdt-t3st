namespace App.Models;

public record ProductRawMaterialView(
    int productID,
    int rawMaterialID,
    uint units);

public record ProductNamedRawMaterialView(
    int rawMaterialID,
    string rawMaterialName,
    uint units);
