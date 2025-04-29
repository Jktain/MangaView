using MangaView.Api.Models.DTOs;
using MangaView.Api.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace MangaView.Api.Controllers;

[ApiController]
[Route("api")]
public class PagesController : ControllerBase
{
    private readonly PageRepository _repository;

    public PagesController(PageRepository repository)
    {
        _repository = repository;
    }

    [HttpGet("chapters/{chapterId}/pages")]
    public async Task<IActionResult> GetPages(int chapterId)
    {
        var pages = await _repository.GetPagesByChapterIdAsync(chapterId);
        return Ok(pages);
    }

    [HttpPost("pages")]
    public async Task<IActionResult> AddPage([FromBody] CreatePageDto dto)
    {
        if (dto.PageNumber <= 0 || string.IsNullOrWhiteSpace(dto.ImageUrl))
            return BadRequest("PageNumber та ImageUrl обов'язкові.");

        var id = await _repository.AddPageAsync(dto);
        return Created($"api/pages/{id}", new { id });
    }
}
