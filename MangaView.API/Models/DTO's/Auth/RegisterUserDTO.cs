﻿namespace MangaView.Api.Models.DTOs.Auth;

public class RegisterUserDto
{
    public string Email { get; set; } = string.Empty;
    public string Username { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
}
