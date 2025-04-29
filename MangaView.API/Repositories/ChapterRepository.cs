using Dapper;
using MangaView.Api.Models;
using MangaView.Api.Models.DTOs;
using MangaView.Api.Services;

namespace MangaView.Api.Repositories;

public class ChapterRepository
{
    private readonly DapperContext _context;

    public ChapterRepository(DapperContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Chapter>> GetChaptersByMangaIdAsync(int mangaId)
    {
        var query = "SELECT * FROM Chapters WHERE MangaId = @MangaId ORDER BY ChapterNumber";

        using var connection = _context.CreateConnection();
        return await connection.QueryAsync<Chapter>(query, new { MangaId = mangaId });
    }

    public async Task<int> AddChapterAsync(CreateChapterDto dto)
    {
        var query = @"
            INSERT INTO Chapters (MangaId, ChapterNumber, Title)
            VALUES (@MangaId, @ChapterNumber, @Title);
            SELECT CAST(SCOPE_IDENTITY() as int);
        ";

        using var connection = _context.CreateConnection();
        return await connection.ExecuteScalarAsync<int>(query, dto);
    }
}
