namespace MangaView.Api.Models.DTOs;

public class CreateRatingDto
{
    public int UserId {  get; set; }
    public int MangaId { get; set; }
    public int Score { get; set; } // 1-10
}
