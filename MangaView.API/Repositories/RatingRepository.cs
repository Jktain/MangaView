using Dapper;
using MangaView.Api.Models;
using MangaView.Api.Models.DTOs;
using MangaView.Api.Services;

namespace MangaView.Api.Repositories;

public class RatingRepository
{
    private readonly DapperContext _context;

    public RatingRepository(DapperContext context)
    {
        _context = context;
    }

    public async Task AddOrUpdateRatingAsync(int userId, CreateRatingDto dto)
    {
        var checkQuery = "SELECT COUNT(*) FROM Ratings WHERE UserId = @UserId AND MangaId = @MangaId";

        var updateQuery = "UPDATE Ratings SET Score = @Score WHERE UserId = @UserId AND MangaId = @MangaId";

        var insertQuery = @"
            INSERT INTO Ratings (UserId, MangaId, Score)
            VALUES (@UserId, @MangaId, @Score)
        ";

        using var connection = _context.CreateConnection();
        var exists = await connection.ExecuteScalarAsync<int>(checkQuery, new { UserId = userId, dto.MangaId });

        if (exists > 0)
        {
            await connection.ExecuteAsync(updateQuery, new { UserId = userId, dto.MangaId, dto.Score });
        }
        else
        {
            await connection.ExecuteAsync(insertQuery, new { UserId = userId, dto.MangaId, dto.Score });
        }
    }

    public async Task<float> GetAverageRatingAsync(int mangaId)
    {
        var query = "SELECT AVG(CAST(Score AS FLOAT)) FROM Ratings WHERE MangaId = @MangaId";

        using var connection = _context.CreateConnection();
        var avg = await connection.ExecuteScalarAsync<float?>(query, new { MangaId = mangaId });
        return avg ?? 0f;
    }
}
