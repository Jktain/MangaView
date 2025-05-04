using MangaView.Api.Models;
using MangaView.Api.Models.DTOs.Auth;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Dapper;


namespace MangaView.Api.Services;

public class AuthService
{
    private readonly DapperContext _context;
    private readonly IConfiguration _configuration;

    public AuthService(DapperContext context, IConfiguration configuration)
    {
        _context = context;
        _configuration = configuration;
    }

    public async Task<bool> RegisterAsync(RegisterUserDto dto)
    {
        var query = "SELECT COUNT(*) FROM Users WHERE Email = @Email";
        using var connection = _context.CreateConnection();
        var exists = await connection.ExecuteScalarAsync<int>(query, new { dto.Email });

        if (exists > 0)
            return false; // Користувач уже існує

        var insertQuery = @"
            INSERT INTO Users (Email, Username, PasswordHash)
            VALUES (@Email, @Username, @PasswordHash)";

        var passwordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password);

        await connection.ExecuteAsync(insertQuery, new { dto.Email, dto.Username, PasswordHash = passwordHash });
        return true;
    }

    public async Task<string?> LoginAsync(LoginUserDto dto)
    {
        var query = "SELECT * FROM Users WHERE Email = @Email";
        using var connection = _context.CreateConnection();
        var user = await connection.QuerySingleOrDefaultAsync<User>(query, new { dto.Email });

        if (user == null || !BCrypt.Net.BCrypt.Verify(dto.Password, user.PasswordHash))
            return null;

        return GenerateJwtToken(user);
    }

    private string GenerateJwtToken(User user)
    {
        var claims = new[]
        {
            new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new Claim(ClaimTypes.Email, user.Email),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
        };

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]!));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            issuer: _configuration["Jwt:Issuer"],
            audience: _configuration["Jwt:Audience"],
            claims: claims,
            expires: DateTime.UtcNow.AddDays(7),
            signingCredentials: creds
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}
