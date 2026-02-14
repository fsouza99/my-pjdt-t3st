using App.Models;
using Microsoft.EntityFrameworkCore;

namespace App.Data;

public class AppDbContext : DbContext
{
    public AppDbContext (DbContextOptions<AppDbContext> options) : base(options) {}

    public DbSet<Product> Product { get; set; } = default!;
    public DbSet<ProductRawMaterial> ProductRawMaterial { get; set; } = default!;
    public DbSet<RawMaterial> RawMaterial { get; set; } = default!;
}
