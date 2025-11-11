using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Imobiliaria.Models; // Ajuste se seu namespace for diferente
using Imobiliaria.Infrastructure;

[ApiController]
[Route("api/[controller]")]
[Authorize(Roles = "admin")]
public class UserController : ControllerBase
{
    private readonly ImobiliariaDbContext _db;

    public UserController(ImobiliariaDbContext db)
    {
        _db = db;
    }

    [HttpGet]
    public IActionResult GetAll()
    {
        var users = _db.Users
            .Select(u => new { u.Id, u.Nome, u.Email, u.Perfil })
            .ToList();
        return Ok(users);
    }

    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
        var user = _db.Users.Find(id);
        if (user == null) return NotFound();
        _db.Users.Remove(user);
        _db.SaveChanges();
        return NoContent();
    }
}
