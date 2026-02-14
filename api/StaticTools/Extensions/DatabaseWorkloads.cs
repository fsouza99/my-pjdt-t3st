using App.Data;
using Microsoft.EntityFrameworkCore;

namespace App.StaticTools.Extensions;

public static class DatabaseWorkloads
{
    // Initializes the database by creating the models and adding placeholder data.
    public static async Task InitializeDatabaseAsync(
        this WebApplication app, bool useSqlite)
    {
        using (var scope = app.Services.CreateScope())
        {
            var services = scope.ServiceProvider;
            var context = services.GetRequiredService<AppDbContext>();

            await context.Database.EnsureCreatedAsync();
            if (await context.Product.AnyAsync())
            {
                // Leave if data is created.
                return;
            }

            var dbinit = new DbInitializer(services, context);
            await dbinit.AddBusinessData();
        }
    }
}
