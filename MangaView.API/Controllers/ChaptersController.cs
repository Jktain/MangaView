using MangaView.Api.Models.DTOs;
using MangaView.Api.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace MangaView.Api.Controllers;

[ApiController]
[Route("api")]
public class ChaptersController : ControllerBase
{
    private readonly ChapterRepository _repository;

    public ChaptersController(ChapterRepository repository)
    {
        _repository = repository;
    }

    [HttpGet("chapters/{mangaId}/number/{chapterNumber}")]
    public async Task<IActionResult> GetChapterByNumber(int mangaId, float chapterNumber)
    {
        var chapter = await _repository.GetChapterByMangaAndNumberAsync(mangaId, chapterNumber);
        return chapter == null ? NotFound() : Ok(chapter);
    }

    [HttpGet("manga/{mangaId}/chapters")]
    public async Task<IActionResult> GetChapters(int mangaId)
    {
        var chapters = await _repository.GetChaptersByMangaIdAsync(mangaId);
        return Ok(chapters);
    }

    [Authorize]
    [HttpPost("chapters")]
    public async Task<IActionResult> AddChapter([FromBody] CreateChapterDto dto)
    {
        if (dto.ChapterNumber <= 0)
            return BadRequest("Номер глави має бути більше 0");

        var id = await _repository.AddChapterAsync(dto);
        return Created($"api/chapters/{id}", new { id });
    }
}