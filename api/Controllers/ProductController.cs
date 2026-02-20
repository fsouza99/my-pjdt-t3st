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
public class ProductController : ControllerBase
{
    private readonly AppDbContext _context;

    public ProductController(AppDbContext context)
    {
        _context = context;
    }

    // GET: api/Product/Meta
    [HttpGet("Meta")]
    public async Task<ActionResult<int>> GetMetadata(string? name)
    {
        var query = QueryRefiner.Products(_context.Product, name);
        var count = await query.CountAsync();
        return count;
    }

    // GET: api/Product
    [HttpGet]
    public async Task<ActionResult<IEnumerable<SimpleProductView>>> GetProducts(
        string? name, int? offset, int? limit)
    {
        var query = QueryRefiner.Products(_context.Product, name, offset, limit);
        var result = await query
            .Select(p => ViewFactory.SimpleProduct(p))
            .ToListAsync();
        return result;
    }

    // GET: api/Product/Projections
    [HttpGet("Projections")]
    public async Task<ActionResult<IEnumerable<ProductProfitProjectionView>>> GetProductionProjections()
    {
        var result = new List<ProductProfitProjectionView>();
        var products = await _context.Product
            .Include(p => p.ProductRawMaterials)
            .ThenInclude(p => p.RawMaterial)
            .ToListAsync();
        foreach (var product in products)
        {
            if (product.ProductRawMaterials.Count == 0)
            {
                continue;
            }
            uint maxFeaseableUnits = uint.MaxValue;
            foreach (var prm in product.ProductRawMaterials)
            {
                uint localMaxFeasableUnits = prm.RawMaterial.Units / prm.Units;
                if (maxFeaseableUnits > localMaxFeasableUnits)
                {
                    maxFeaseableUnits = localMaxFeasableUnits;
                }
            }
            decimal totalValue = product.Value * maxFeaseableUnits;
            result.Add(new ProductProfitProjectionView(
                product.ID,
                product.Name,
                maxFeaseableUnits,
                product.Value,
                totalValue));
        }
        return result.OrderByDescending(r => r.totalValue).ToList();
    }

    // GET: api/Product/5
    [HttpGet("{id}")]
    public async Task<ActionResult<ProductView>> GetProduct(int id)
    {
        var product = await _context.Product
            .Include(p => p.ProductRawMaterials)
            .ThenInclude(p => p.RawMaterial)
            .FirstOrDefaultAsync(p => p.ID == id);
        if (product is null)
        {
            return NotFound();
        }

        return ViewFactory.Product(product);
    }

    // PUT: api/Product/5
    [HttpPut("{id}")]
    public async Task<IActionResult> PutProduct(int id, ProductDto dto)
    {
        var product = await _context.Product.FindAsync(id);
        if (product is null)
        {
            return NotFound();
        }

        product.Name = dto.name;
        product.Value = dto.value;

        _context.Entry(product).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!ProductExists(id))
            {
                return NotFound();
            }
            return Conflict();
        }

        return NoContent();
    }

    // POST: api/Product
    [HttpPost]
    public async Task<ActionResult<SimpleProductView>> PostProduct(ProductDto dto)
    {
        var product = new Product
        {
            Name = dto.name,
            Value = dto.value
        };

        _context.Product.Add(product);
        await _context.SaveChangesAsync();

        return CreatedAtAction(
            nameof(GetProduct),
            new { id = product.ID },
            ViewFactory.SimpleProduct(product));
    }

    // DELETE: api/Product/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteProduct(int id)
    {
        var product = await _context.Product.FindAsync(id);
        if (product is null)
        {
            return NotFound();
        }

        _context.Product.Remove(product);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    private bool ProductExists(int id)
    {
        return _context.Product.Any(p => p.ID == id);
    }
}

