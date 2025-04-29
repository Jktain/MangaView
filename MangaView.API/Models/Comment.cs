namespace MangaView.Api.Models;

public class Comment
{
    public int Id { get; set; } // Первинний ключ
    public int UserId { get; set; } // Зовнішній ключ на користувача
    public int MangaId { get; set; } // Зовнішній ключ на мангу
    public string Content { get; set; } = string.Empty; // Текст коментаря
    public DateTime CreatedAt { get; set; } // Дата створення коментаря
}
