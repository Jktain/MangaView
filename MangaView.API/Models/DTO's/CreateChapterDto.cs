namespace MangaView.Api.Models.DTOs;

public class CreateChapterDto
{
    public int MangaId { get; set; }          // До якого тайтлу ця глава
    public float ChapterNumber { get; set; }  // Наприклад: 1, 2.5
    public string? Title { get; set; }        // Опціонально
    public string ImageUrl { get; set; }
}
