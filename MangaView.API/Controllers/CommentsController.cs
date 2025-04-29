using MangaView.Api.Models.DTOs;
using MangaView.Api.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace MangaView.Api.Controllers;

[ApiController]
[Route("api")]
public class CommentsController : ControllerBase
{
    private readonly CommentRepository _repository;

    public CommentsController(CommentRepository repository)
    {
        _repository = repository;
    }

    [Authorize]
    [HttpPost("comments")]
    public async Task<IActionResult> AddComment(CreateCommentDto dto)
    {
        var userId = int.Parse(User.Identity!.Name!);

        if (string.IsNullOrWhiteSpace(dto.Content))
            return BadRequest("Коментар не може бути порожнім");

        var commentId = await _repository.AddCommentAsync(userId, dto);
        return Created($"api/comments/{commentId}", new { id = commentId });
    }

    [HttpGet("manga/{mangaId}/comments")]
    public async Task<IActionResult> GetComments(int mangaId)
    {
        var comments = await _repository.GetCommentsByMangaIdAsync(mangaId);
        return Ok(comments);
    }
}
