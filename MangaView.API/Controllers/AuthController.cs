using MangaView.Api.Models.DTOs.Auth;
using MangaView.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace MangaView.Api.Controllers;

[ApiController]
[Route("api/auth")]
public class AuthController : ControllerBase
{
    private readonly AuthService _authService;

    public AuthController(AuthService authService)
    {
        _authService = authService;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register(RegisterUserDto dto)
    {
        var result = await _authService.RegisterAsync(dto);
        if (!result)
            return BadRequest("Користувач з таким Email вже існує.");

        return Ok("Реєстрація успішна.");
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login(LoginUserDto dto)
    {
        var token = await _authService.LoginAsync(dto);
        if (token == null)
            return Unauthorized("Неправильна пошта або пароль.");

        return Ok(new { token });
    }
}
