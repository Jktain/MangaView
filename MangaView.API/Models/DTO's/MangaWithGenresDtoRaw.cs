namespace MangaView.Api.Models.DTO_s
{
    public class MangaWithGenresDtoRaw
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string CoverUrl { get; set; }
        public float AverageRating { get; set; } // Середня оцінка
        public string? Genres { get; set; } // агреговані жанри як рядок
    }

}
