using App.Data;
using Microsoft.EntityFrameworkCore;

namespace App.StaticTools.Extensions;

public static class ServiceCollectionExtensions
{
    // Adds database context service for user-selected provider.
    public static IServiceCollection AddAppDbContext(
        this IServiceCollection services, IConfiguration configuration)
    {
        const string connStrKey = "Sqlite";
        string connectionString = configuration.GetConnectionString(connStrKey) ??
            throw new InvalidOperationException($"Connection string '{connStrKey}' not found.");
        services.AddDbContext<AppDbContext>(options => options.UseSqlite(connectionString));

        return services;
    }
}
