using MangaView.Api.Models.DTOs;
using MangaView.Api.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace MangaView.Api.Controllers;

[ApiController]
[Route("api")]
public class RatingsController : ControllerBase
{
    private readonly RatingRepository _repository;

    public RatingsController(RatingRepository repository)
    {
        _repository = repository;
    }

    [Authorize]
    [HttpPost("ratings")]
    public async Task<IActionResult> AddOrUpdateRating([FromBody] CreateRatingDto dto)
    {
        if (dto.Score < 1 || dto.Score > 10)
            return BadRequest("Оцінка має бути від 1 до 10");

        var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);

        await _repository.AddOrUpdateRatingAsync(userId, dto);
        return Ok("Оцінку збережено.");
    }

    [HttpGet("manga/{mangaId}/rating")]
    public async Task<IActionResult> GetAverageRating(int mangaId)
    {
        var avg = await _repository.GetAverageRatingAsync(mangaId);
        return Ok(new { mangaId, averageRating = avg });
    }
}
