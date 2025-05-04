namespace MangaView.Api.Models.DTOs;

public class ChapterDetailDto
{
    public int Id { get; set; }
    public int ChapterNumber { get; set; }
    public int MangaId { get; set; }
    public string Title { get; set; }
    public string ImageUrl { get; set; }
    public int? NextChapterId { get; set; }
}

