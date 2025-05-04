namespace MangaView.API.Models.DTO_s
{
    public class CommentWithUserDto
    {
        public int Id { get; set; }
        public string Content { get; set; } // Текст коментаря
        public string Username { get; set; }
        public DateTime CreatedAt { get; set; } // Дата створення коментаря
    }
}
