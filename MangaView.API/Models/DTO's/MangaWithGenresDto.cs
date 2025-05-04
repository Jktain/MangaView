namespace MangaView.Api.Models.DTOs
{
    public class MangaWithGenresDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string CoverUrl { get; set; }
        public List<string> Genres { get; set; } = new();
    }

}
