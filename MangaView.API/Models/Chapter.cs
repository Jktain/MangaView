namespace MangaView.Api.Models;

public class Chapter
{
    public int Id { get; set; } // Первинний ключ
    public int MangaId { get; set; } // Зовнішній ключ на Manga
    public float ChapterNumber { get; set; } // Номер глави (може бути 4.5, тому float)
    public string? Title { get; set; } // Назва глави (опціонально)
    public DateTime CreatedAt { get; set; } // Дата створення глави
}
