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

    // PUT: api/ProductRawMaterial/5/5
    [HttpPut]
    public async Task<IActionResult> PutProductRawMaterial(ProductRawMaterialDto dto)
    {
        var rawMaterial = await _context.ProductRawMaterial.FindAsync(
            dto.productID, dto.rawMaterialID);
        if (rawMaterial is null)
        {
            return NotFound();
        }

        rawMaterial.Units = dto.units;

        _context.Entry(rawMaterial).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!ProductRawMaterialExists(dto.productID, dto.rawMaterialID))
            {
                return NotFound();
            }
            return Conflict();
        }

        return NoContent();
    }

    // POST: api/ProductRawMaterial
    [HttpPost]
    public async Task<ActionResult<ProductRawMaterialView>> PostProductRawMaterial(
        ProductRawMaterialDto dto)
    {
        var productExists = await _context.Product.AnyAsync(p => p.ID == dto.productID);
        if (!productExists)
        {
            return NotFound("Product not found.");
        }

        var rawMaterialExists = await _context.RawMaterial.AnyAsync(
            r => r.ID == dto.rawMaterialID);
        if (!rawMaterialExists)
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
    [HttpDelete("{productId}/{rawMaterialId}")]
    public async Task<IActionResult> DeleteProductRawMaterial(
        int productId, int rawMaterialId)
    {
        var rawMaterial = await _context.ProductRawMaterial.FindAsync(
            productId, rawMaterialId);
        if (rawMaterial is null)
        {
            return NotFound();
        }

        _context.ProductRawMaterial.Remove(rawMaterial);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    private bool ProductRawMaterialExists(int productID, int rawMaterialID)
    {
        return _context.ProductRawMaterial.Any(
            p => p.ProductID == productID && p.RawMaterialID == rawMaterialID);
    }
}

