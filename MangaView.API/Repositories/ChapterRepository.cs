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

    public async Task<ChapterDetailDto?> GetChapterByMangaAndNumberAsync(int mangaId, float chapterNumber)
    {
        using var connection = _context.CreateConnection();

        var chapter = await connection.QuerySingleOrDefaultAsync<ChapterDetailDto>(@"
        SELECT id, chapterNumber, mangaId, imageUrl, title
        FROM Chapters 
        WHERE mangaId = @MangaId AND chapterNumber = @ChapterNumber
    ", new { MangaId = mangaId, ChapterNumber = chapterNumber });

        if (chapter == null) return null;

        chapter.NextChapterId = await connection.ExecuteScalarAsync<int?>(@"
        SELECT TOP 1 id FROM Chapters
        WHERE mangaId = @MangaId AND ChapterNumber > @ChapterNumber
        ORDER BY ChapterNumber ASC
    ", new { MangaId = mangaId, ChapterNumber = chapterNumber });

        return chapter;
    }


    public async Task<IEnumerable<Chapter>> GetChaptersByMangaIdAsync(int mangaId)
    {
        var query = "SELECT * FROM Chapters WHERE MangaId = @MangaId ORDER BY ChapterNumber";

        using var connection = _context.CreateConnection();
        return await connection.QueryAsync<Chapter>(query, new { MangaId = mangaId });
    }

    public async Task<int> AddChapterAsync(CreateChapterDto dto)
    {
        using var connection = _context.CreateConnection();

        var query = @"
            INSERT INTO Chapters (MangaId, ChapterNumber, Title, CreatedAt, ImageUrl)
            VALUES (@MangaId, @ChapterNumber, @Title, GETUTCDATE(), @ImageUrl);
            SELECT CAST(SCOPE_IDENTITY() as int);
        ";

        var newId = await connection.ExecuteScalarAsync<int>(query, dto);
        return newId;
    }

}
