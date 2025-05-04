using MangaView.Api.Services;
using MangaView.API.Models;
using Dapper;

namespace MangaView.API.Repositories
{
    public class GenreRepository
    {
        private readonly DapperContext _context;

        public GenreRepository(DapperContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Genre>> GetAllGenresAsync()
        {
            var sql = "SELECT Id, Name FROM Genres ORDER BY Name";

            using var connection = _context.CreateConnection();
            var genres = await connection.QueryAsync<Genre>(sql);
            return genres;
        }

    }
}
