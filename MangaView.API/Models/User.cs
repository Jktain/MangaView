namespace MangaView.Api.Models;

public class User
{
    public int Id { get; set; } // Первинний ключ
    public string Email { get; set; } = string.Empty; // Пошта користувача
    public string PasswordHash { get; set; } = string.Empty; // Хеш пароля
    public DateTime CreatedAt { get; set; } // Дата створення
}
