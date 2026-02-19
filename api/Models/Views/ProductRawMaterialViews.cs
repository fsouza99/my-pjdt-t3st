namespace App.Models;

public record ProductRawMaterialView(
    int prId,
    int rmId,
    uint units);

public record ProductNamedRawMaterialView(
    int id,
    string name,
    uint units);
