namespace MangaView.Api.Models;

public class Rating
{
    public int Id { get; set; } // Первинний ключ
    public int UserId { get; set; } // Зовнішній ключ на користувача
    public int MangaId { get; set; } // Зовнішній ключ на мангу
    public int Score { get; set; } // Оцінка (1-10)
}
