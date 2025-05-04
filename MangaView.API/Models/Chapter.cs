namespace MangaView.Api.Models;

public class Chapter
{
    public int Id { get; set; }                      
    public int MangaId { get; set; }               
    public float ChapterNumber { get; set; }       
    public string? Title { get; set; }              
    public DateTime CreatedAt { get; set; }          
    public string ImageUrl { get; set; }            
}
