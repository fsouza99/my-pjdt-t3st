using App.Data;
using App.Models;
using App.StaticTools;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System;

namespace App.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ProductRawMaterialController : ControllerBase
{
    private readonly AppDbContext _context;

    public ProductRawMaterialController(AppDbContext context)
    {
        _context = context;
    }

    // GET: api/ProductRawMaterial/5/5
    [HttpGet("{productId}/{rawMaterialId}")]
    public async Task<ActionResult<ProductRawMaterialView>> GetProductRawMaterial(
        int productId, int rawMaterialId)
    {
        var rawMaterial = await _context.ProductRawMaterial.FindAsync(
            productId, rawMaterialId);
        if (rawMaterial is null)
        {
            return NotFound();
        }

        return ViewFactory.ProductRawMaterial(rawMaterial);
    }

    // POST: api/ProductRawMaterial
    [HttpPost]
    public async Task<ActionResult<ProductRawMaterialView>> PostProductRawMaterial(
        ProductRawMaterialDto dto)
    {
        var product = await _context.Product.FindAsync(dto.productID);
        if (product is null)
        {
            return NotFound("Product not found.");
        }

        var rawMaterial = await _context.RawMaterial.FindAsync(dto.rawMaterialID);
        if (rawMaterial is null)
        {
            return NotFound("Raw material not found.");
        }

        var prodRawMaterial = new ProductRawMaterial
        {
            ProductID = dto.productID,
            RawMaterialID = dto.rawMaterialID,
            Units = dto.units
        };

        _context.ProductRawMaterial.Add(prodRawMaterial);
        await _context.SaveChangesAsync();

        return CreatedAtAction(
            nameof(GetProductRawMaterial),
            new {
                productID = prodRawMaterial.ProductID,
                rawMaterialID = prodRawMaterial.RawMaterialID,
                units = prodRawMaterial.Units
            },
            ViewFactory.ProductRawMaterial(prodRawMaterial));
    }

    // DELETE: api/ProductRawMaterial/5/5
    [HttpDelete("{tagId}/{articleId}")]
    public async Task<IActionResult> DeleteProductRawMaterial(
        int productID, int rawMaterialID)
    {
        var rawMaterial = await _context.ProductRawMaterial.FindAsync(
            productID, rawMaterialID);
        if (rawMaterial is null)
        {
            return NotFound();
        }

        _context.ProductRawMaterial.Remove(rawMaterial);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}

