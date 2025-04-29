using Dapper;
using MangaView.Api.Models;
using MangaView.Api.Models.DTOs;
using MangaView.Api.Services;

namespace MangaView.Api.Repositories;

public class PageRepository
{
    private readonly DapperContext _context;

    public PageRepository(DapperContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Page>> GetPagesByChapterIdAsync(int chapterId)
    {
        var query = "SELECT * FROM Pages WHERE ChapterId = @ChapterId ORDER BY PageNumber";

        using var connection = _context.CreateConnection();
        return await connection.QueryAsync<Page>(query, new { ChapterId = chapterId });
    }

    public async Task<int> AddPageAsync(CreatePageDto dto)
    {
        var query = @"
            INSERT INTO Pages (ChapterId, PageNumber, ImageUrl)
            VALUES (@ChapterId, @PageNumber, @ImageUrl);
            SELECT CAST(SCOPE_IDENTITY() as int);
        ";

        using var connection = _context.CreateConnection();
        return await connection.ExecuteScalarAsync<int>(query, dto);
    }
}