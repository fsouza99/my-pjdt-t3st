using App.Data;
using Microsoft.EntityFrameworkCore;

namespace App.StaticTools.Extensions;

public static class ServiceCollectionExtensions
{
    // Adds database context service for user-selected provider.
    public static IServiceCollection AddAppDbContext(
        this IServiceCollection services, IConfiguration configuration, bool useSqlite)
    {
        if (useSqlite)
        {
            const string connStrKey = "Sqlite";
            string connectionString = configuration.GetConnectionString(connStrKey) ??
                throw new InvalidOperationException(
                    $"Connection string '{connStrKey}' not found.");
            services.AddDbContext<AppDbContext>(
                options => options.UseSqlite(connectionString));
        }
        else
        {
            const string connStrKey = "DatabaseEnvVarKey";
            string envVarKey = configuration.GetConnectionString(connStrKey) ??
                throw new InvalidOperationException(
                    $"Connection string '{connStrKey}' not found.");
            string connectionString = configuration[envVarKey] ??
                throw new InvalidOperationException(
                    $"Environment variable '{envVarKey}' not found.");
            services.AddDbContext<AppDbContext>(
                options => options.UseMySQL(connectionString));
        }

        return services;
    }
}
