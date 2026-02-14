using App.Models;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace App.StaticTools;

public static class QueryRefiner
{
    /*! Applies boundaries to query, allowing for pagination. */
    public static IQueryable<T> Bound<T>(
        IQueryable<T> query, int? offset = null, int? limit = null)
    {
        if (offset is not null && offset > 0)
        {
            query = query.Skip((int) offset);
        }
        if (limit is not null && limit > 0)
        {
            query = query.Take((int) limit);
        }
        return query;
    }

    public static IQueryable<Product> Products(
        IQueryable <Product> query,
        string? name = null,
        int? offset = null,
        int? limit = null)
    {
        if (!string.IsNullOrEmpty(name))
        {
            query = query.Where(r => EF.Functions.Like(r.Name, $"%{name}%"));
        }
        return Bound(query, offset, limit);
    }

    public static IQueryable<RawMaterial> RawMaterials(
        IQueryable <RawMaterial> query,
        string? name = null,
        int? offset = null,
        int? limit = null)
    {
        if (!string.IsNullOrEmpty(name))
        {
            query = query.Where(p => EF.Functions.Like(p.Name, $"%{name}%"));
        }
        return Bound(query, offset, limit);
    }
}

