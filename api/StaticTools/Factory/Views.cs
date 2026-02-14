using App.Models;

namespace App.StaticTools;

public static class ViewFactory
{
    public static ProductView Product(Product product)
    { 
        var prms = new List<ProductNamedRawMaterialView>();
        foreach (var prm in product.ProductRawMaterials)
        {
            prms.Add(new ProductNamedRawMaterialView(
                prm.RawMaterialID,
                prm.RawMaterial.Name,
                prm.Units));
        }
        return new ProductView(product.ID, product.Name, product.Value, prms);
    }

    public static SimpleProductView SimpleProduct(
        Product product) => new SimpleProductView(
        product.ID,
        product.Name,
        product.Value);

    public static RawMaterialView RawMaterial(
        RawMaterial rawMaterial) => new RawMaterialView(
        rawMaterial.ID,
        rawMaterial.Name,
        rawMaterial.Units);

    public static SimpleRawMaterialView SimpleRawMaterial(
        RawMaterial rawMaterial) => new SimpleRawMaterialView(
        rawMaterial.ID,
        rawMaterial.Name);

    public static ProductRawMaterialView ProductRawMaterial(
        ProductRawMaterial productRawMaterial) => new ProductRawMaterialView(
        productRawMaterial.ProductID,
        productRawMaterial.RawMaterialID,
        productRawMaterial.Units);
}

