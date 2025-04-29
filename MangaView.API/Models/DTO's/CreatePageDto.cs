namespace MangaView.Api.Models.DTOs;

public class CreatePageDto
{
    public int ChapterId { get; set; }       // До якої глави відноситься сторінка
    public int PageNumber { get; set; }       // Порядковий номер сторінки
    public string ImageUrl { get; set; } = string.Empty; // Посилання на картинку
}
