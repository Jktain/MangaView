namespace MangaView.Api.Models.DTOs;

public class CreateCommentDto
{
    public int MangaId { get; set; }
    public string Content { get; set; } = string.Empty;
}
