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
public class RawMaterialController : ControllerBase
{
    private readonly AppDbContext _context;

    public RawMaterialController(AppDbContext context)
    {
        _context = context;
    }

    // GET: api/RawMaterial/Meta
    [HttpGet("Meta")]
    public async Task<ActionResult<int>> GetMetadata(string? name)
    {
        var query = QueryRefiner.RawMaterials(_context.RawMaterial, name);
        var count = await query.CountAsync();
        return count;
    }

    // GET: api/RawMaterial
    [HttpGet]
    public async Task<ActionResult<IEnumerable<RawMaterialView>>> GetRawMaterials(
        string? name, int? offset, int? limit)
    {
        var query = QueryRefiner.RawMaterials(_context.RawMaterial, name, offset, limit);
        var result = await query
            .Select(r => ViewFactory.RawMaterial(r))
            .ToListAsync();
        return result;
    }

    // GET: api/RawMaterial/5
    [HttpGet("{id}")]
    public async Task<ActionResult<RawMaterialView>> GetRawMaterial(int id)
    {
        var rawMaterial = await _context.RawMaterial.FindAsync(id);
        if (rawMaterial is null)
        {
            return NotFound();
        }

        return ViewFactory.RawMaterial(rawMaterial);
    }

    // PUT: api/RawMaterial/5
    [HttpPut("{id}")]
    public async Task<IActionResult> PutRawMaterial(int id, RawMaterialDto dto)
    {
        var rawMaterial = await _context.RawMaterial.FindAsync(id);
        if (rawMaterial is null)
        {
            return NotFound();
        }

        rawMaterial.Name = dto.name;
        rawMaterial.Units = dto.units;

        _context.Entry(rawMaterial).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!RawMaterialExists(id))
            {
                return NotFound();
            }
            return Conflict();
        }

        return NoContent();
    }

    // POST: api/RawMaterial
    [HttpPost]
    public async Task<ActionResult<RawMaterialView>> PostRawMaterial(RawMaterialDto dto)
    {
        var rawMaterial = new RawMaterial
        {
            Name = dto.name,
            Units = dto.units
        };

        _context.RawMaterial.Add(rawMaterial);
        await _context.SaveChangesAsync();

        return CreatedAtAction(
            nameof(GetRawMaterial),
            new { id = rawMaterial.ID },
            ViewFactory.RawMaterial(rawMaterial));
    }

    // DELETE: api/RawMaterial/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteRawMaterial(int id)
    {
        var rawMaterial = await _context.RawMaterial.FindAsync(id);
        if (rawMaterial is null)
        {
            return NotFound();
        }

        _context.RawMaterial.Remove(rawMaterial);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    private bool RawMaterialExists(int id)
    {
        return _context.RawMaterial.Any(p => p.ID == id);
    }
}

