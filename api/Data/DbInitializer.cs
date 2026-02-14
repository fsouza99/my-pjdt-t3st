using App.Models;
using Microsoft.EntityFrameworkCore;
using System.IO;
using System.Text.Json;

namespace App.Data;

public class DbInitializer
{
    private readonly AppDbContext _context;
    private readonly IServiceProvider _serviceProvider;

    public DbInitializer(IServiceProvider serviceProvider, AppDbContext context)
    {
        _serviceProvider = serviceProvider;
        _context = context;
    }

    // Reads JSON file and returns its content appropriately.
    private static string ReadJsonFile(string filename)
    {
        return File.ReadAllText($"Data\\Placeholders\\{filename}.json");
    }

    private void AddJsonData<T>(string filename, DbSet<T> dbSet) where T : class
    {
        string data = ReadJsonFile(filename);
        List<T> objs = JsonSerializer.Deserialize<List<T>>(data)!;
        dbSet.AddRange(objs);
    }

    public async Task AddBusinessData()
    {
        AddJsonData<Product>("Products", _context.Product);
        AddJsonData<RawMaterial>("RawMaterials", _context.RawMaterial);
        AddJsonData<ProductRawMaterial>(
            "ProductRawMaterials", _context.ProductRawMaterial);

        await _context.SaveChangesAsync();
    }
}
