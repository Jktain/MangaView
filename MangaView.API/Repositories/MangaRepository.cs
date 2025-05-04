using Dapper;
using MangaView.Api.Models;
using MangaView.Api.Models.DTO_s;
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
    public async Task<IEnumerable<MangaWithGenresDto>> GetAllMangaAsync()
    {
        var query = @"
        SELECT
            m.Id,
            m.Title,
            m.Description,
            m.CoverUrl,
            STRING_AGG(g.Name, ',') AS Genres
        FROM Manga m
        LEFT JOIN MangaGenres mg ON m.Id = mg.MangaId
        LEFT JOIN Genres g ON mg.GenreId = g.Id
        GROUP BY m.Id, m.Title, m.Description, m.CoverUrl
    ";

        using var connection = _context.CreateConnection();

        var result = await connection.QueryAsync<MangaWithGenresDtoRaw>(query);

        // розпарсити Genres у список
        return result.Select(m => new MangaWithGenresDto
        {
            Id = m.Id,
            Title = m.Title,
            Description = m.Description,
            CoverUrl = m.CoverUrl,
            Genres = m.Genres?.Split(',', StringSplitOptions.RemoveEmptyEntries)
                             .Select(g => g.Trim())
                             .ToList() ?? new List<string>()
        });
    }


    // Отримати конкретний тайтл за його Id
    public async Task<MangaWithGenresDto?> GetMangaByIdAsync(int id)
    {
        var sql = @"
        SELECT m.Id, m.Title, m.Description, m.CoverUrl, m.AverageRating, g.Name
        FROM Manga m
        LEFT JOIN MangaGenres mg ON m.Id = mg.MangaId
        LEFT JOIN Genres g ON mg.GenreId = g.Id
        WHERE m.Id = @Id";

        using var connection = _context.CreateConnection();

        var mangaDict = new Dictionary<int, MangaWithGenresDto>();

        var result = await connection.QueryAsync<MangaWithGenresDto, string, MangaWithGenresDto>(
            sql,
            (manga, genre) =>
            {
                if (!mangaDict.TryGetValue(manga.Id, out var existing))
                {
                    existing = manga;
                    existing.Genres = new List<string>();
                    mangaDict[manga.Id] = existing;
                }

                if (!string.IsNullOrWhiteSpace(genre))
                    existing.Genres.Add(genre);

                return existing;
            },
            new { Id = id },
            splitOn: "Name"
        );

        return mangaDict.Values.FirstOrDefault();
    }


    public async Task<int> AddMangaAsync(CreateMangaDto dto)
    {
        var query = @"
        INSERT INTO Manga (Title, Description, CoverUrl)
        VALUES (@Title, @Description, @CoverUrl);
        SELECT CAST(SCOPE_IDENTITY() as int);";

        using var connection = _context.CreateConnection();
        using var transaction = connection.BeginTransaction();

        try
        {
            var mangaId = await connection.ExecuteScalarAsync<int>(
                query, dto, transaction);

            foreach (var genreId in dto.GenreIds.Distinct())
            {
                await connection.ExecuteAsync(@"
                INSERT INTO MangaGenres (MangaId, GenreId)
                VALUES (@MangaId, @GenreId);",
                    new { MangaId = mangaId, GenreId = genreId }, transaction);
            }

            transaction.Commit();
            return mangaId;
        }
        catch
        {
            transaction.Rollback();
            throw;
        }
    }

}
