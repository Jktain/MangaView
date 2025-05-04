using Dapper;
using MangaView.Api.Models;
using MangaView.Api.Models.DTOs;
using MangaView.Api.Services;
using MangaView.API.Models.DTO_s;

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

    public async Task<IEnumerable<CommentWithUserDto>> GetCommentsByMangaIdAsync(int mangaId)
    {
        var query = @"
            SELECT c.Id, c.Content, u.Username, c.CreatedAt
            FROM Comments c 
            LEFT JOIN Users u ON c.UserId = u.Id
            WHERE c.MangaId = @MangaId 
            ORDER BY CreatedAt DESC";

        using var connection = _context.CreateConnection();
        return await connection.QueryAsync<CommentWithUserDto>(query, new { MangaId = mangaId });
    }
}
