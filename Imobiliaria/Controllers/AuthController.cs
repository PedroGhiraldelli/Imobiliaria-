using BCrypt.Net;
using Imobiliaria.Infrastructure;
using Imobiliaria.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Authorization;

[ApiController]
[Route("api/[controller]")]
[Authorize] // Protege toda a controller, libera pelo AllowAnonymous nas actions necessárias

public class AuthController : ControllerBase
{
    private readonly ImobiliariaDbContext _db;
    private readonly IConfiguration _config;

    public AuthController(ImobiliariaDbContext db, IConfiguration config)
    {
        _db = db;
        _config = config;
    }

    [AllowAnonymous]
    [HttpPost("register")]
    public IActionResult Register([FromBody] User user)
    {
        user.Perfil = user.Perfil.ToLower(); // Isso força minúsculo no perfil!
        user.SenhaHash = BCrypt.Net.BCrypt.HashPassword(user.SenhaHash);
        _db.Users.Add(user);
        _db.SaveChanges();
        return Ok();
    }

    [AllowAnonymous]
    [HttpPost("login")]
    public IActionResult Login([FromBody] LoginModel login)
    {
        var user = _db.Users.FirstOrDefault(u => u.Email.ToLower () == login.Email.ToLower());

        if (user == null || !BCrypt.Net.BCrypt.Verify(login.Senha, user.SenhaHash))
            return Unauthorized();

        var token = GenerateJwtToken(user.Email, user.Perfil);
        return Ok(new { token });
    }

    private string GenerateJwtToken(string email, string perfil)
    {
        var claims = new[]
        {
            new System.Security.Claims.Claim(System.Security.Claims.ClaimTypes.Name, email),
            new System.Security.Claims.Claim(System.Security.Claims.ClaimTypes.Role, perfil)
        };

        var key = new Microsoft.IdentityModel.Tokens.SymmetricSecurityKey(
            System.Text.Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
        var creds = new Microsoft.IdentityModel.Tokens.SigningCredentials(
            key, Microsoft.IdentityModel.Tokens.SecurityAlgorithms.HmacSha256);

        var token = new System.IdentityModel.Tokens.Jwt.JwtSecurityToken(
            issuer: _config["Jwt:Issuer"],
            audience: _config["Jwt:Audience"],
            claims: claims,
            expires: DateTime.Now.AddHours(4),
            signingCredentials: creds);

        return new System.IdentityModel.Tokens.Jwt.JwtSecurityTokenHandler().WriteToken(token);
    }
}
