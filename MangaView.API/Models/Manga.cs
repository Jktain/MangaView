namespace MangaView.Api.Models;

public class Manga
{
    public int Id { get; set; } // Первинний ключ
    public string Title { get; set; } = string.Empty; // Назва тайтлу
    public string Description { get; set; } = string.Empty; // Опис
    public string? CoverUrl { get; set; } // Посилання на обкладинку
    public string? Genres { get; set; } // Жанри через кому або в json
    public float AverageRating { get; set; } // Середня оцінка
}
