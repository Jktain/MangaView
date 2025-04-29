using Dapper;
using MangaView.Api.Models;
using MangaView.Api.Models.DTOs;
using MangaView.Api.Services;

namespace MangaView.Api.Repositories;

public class MangaRepository
{
    private readonly DapperContext _context;

    public MangaRepository(DapperContext context)
    {
        _context = context;
    }

    // Отримати всі тайтли манги
    public async Task<IEnumerable<Manga>> GetAllMangaAsync()
    {
        var query = "SELECT * FROM Manga";

        using var connection = _context.CreateConnection();
        var mangaList = await connection.QueryAsync<Manga>(query);

        return mangaList ?? Enumerable.Empty<Manga>(); // захищаємося від null
    }


    // Отримати конкретний тайтл за його Id
    public async Task<Manga?> GetMangaByIdAsync(int id)
    {
        var query = "SELECT * FROM Manga WHERE Id = @Id";

        using var connection = _context.CreateConnection();
        var manga = await connection.QuerySingleOrDefaultAsync<Manga>(query, new { Id = id });
        return manga;
    }

    public async Task<int> AddMangaAsync(CreateMangaDto dto)
    {
        var query = @"
        INSERT INTO Manga (Title, Description, CoverUrl, Genres)
        VALUES (@Title, @Description, @CoverUrl, @Genres);
        SELECT CAST(SCOPE_IDENTITY() as int);
    ";

        using var connection = _context.CreateConnection();
        var newId = await connection.ExecuteScalarAsync<int>(query, dto);
        return newId;
    }
}
