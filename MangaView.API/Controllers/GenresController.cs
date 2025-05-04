using MangaView.API.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace MangaView.API.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class GenresController : ControllerBase
    {
        private readonly GenreRepository _repository;

        public GenresController(GenreRepository repository)
        {
            _repository = repository;
        }

        [HttpGet("genres")]
        public async Task<IActionResult> GetAllGenres()
        {
            var genres = await _repository.GetAllGenresAsync();
            return Ok(genres);
        }

    }
}
