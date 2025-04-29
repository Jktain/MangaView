namespace MangaView.Api.Models;

public class Page
{
    public int Id { get; set; } // Первинний ключ
    public int ChapterId { get; set; } // Зовнішній ключ на главу
    public int PageNumber { get; set; } // Номер сторінки в главі
    public string ImageUrl { get; set; } = string.Empty; // Посилання на картинку сторінки
}
