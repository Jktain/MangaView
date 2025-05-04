using MangaView.Api.Models.DTOs;
using MangaView.Api.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace MangaView.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class MangaController : ControllerBase
{
    private readonly MangaRepository _repository;

    public MangaController(MangaRepository repository)
    {
        _repository = repository;
    }

    // GET: /api/manga
    [HttpGet]
    public async Task<IActionResult> GetAllManga()
    {
        var mangaList = await _repository.GetAllMangaAsync();
        return Ok(mangaList);
    }

    // GET: /api/manga/{id}
    [HttpGet("{id}")]
    public async Task<IActionResult> GetMangaById(int id)
    {
        var manga = await _repository.GetMangaByIdAsync(id);
        if (manga == null)
            return NotFound();

        return Ok(manga);
    }

    [Authorize]
    [HttpPost]
    public async Task<IActionResult> AddManga([FromBody] CreateMangaDto dto)
    {
        if (string.IsNullOrWhiteSpace(dto.Title) || string.IsNullOrWhiteSpace(dto.Description))
            return BadRequest("Title and Description are required.");

        var newId = await _repository.AddMangaAsync(dto);
        return CreatedAtAction(nameof(GetMangaById), new { id = newId }, new { id = newId });
    }
}