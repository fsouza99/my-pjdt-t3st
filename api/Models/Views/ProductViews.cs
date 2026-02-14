namespace App.Models;

public record ProductView(
	int id,
	string name,
	decimal value,
	ICollection<ProductNamedRawMaterialView> rawMaterials);

public record SimpleProductView(int id, string name, decimal value);

