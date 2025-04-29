using Dapper;
using MangaView.Api.Models;
using MangaView.Api.Models.DTOs;
using MangaView.Api.Services;

namespace MangaView.Api.Repositories;

public class CommentRepository
{
    private readonly DapperContext _context;

    public CommentRepository(DapperContext context)
    {
        _context = context;
    }

    public async Task<int> AddCommentAsync(int userId, CreateCommentDto dto)
    {
        var query = @"
            INSERT INTO Comments (UserId, MangaId, Content)
            VALUES (@UserId, @MangaId, @Content);
            SELECT CAST(SCOPE_IDENTITY() as int);
        ";

        using var connection = _context.CreateConnection();
        return await connection.ExecuteScalarAsync<int>(query, new { UserId = userId, dto.MangaId, dto.Content });
    }

    public async Task<IEnumerable<Comment>> GetCommentsByMangaIdAsync(int mangaId)
    {
        var query = "SELECT * FROM Comments WHERE MangaId = @MangaId ORDER BY CreatedAt DESC";

        using var connection = _context.CreateConnection();
        return await connection.QueryAsync<Comment>(query, new { MangaId = mangaId });
    }
}
