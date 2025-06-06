﻿namespace MangaView.Api.Models.DTOs;

public class CreateMangaDto
{
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string? CoverUrl { get; set; }
    public List<int> GenreIds { get; set; } = new();
}