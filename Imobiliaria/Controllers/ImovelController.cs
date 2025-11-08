using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using Imobiliaria.Infrastructure;
using Imobiliaria.Models;

namespace Imobiliaria.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ImovelController : ControllerBase
    {
        private readonly ImobiliariaDbContext _context;

        public ImovelController(ImobiliariaDbContext context)
        {
            _context = context;
        }

        // GET: api/imovel
        [Authorize]
        [HttpGet]
        public IActionResult GetAll()
        {
            var imoveis = _context.Imoveis.ToList();
            return Ok(imoveis);
        }

        // GET: api/imovel/{id}
        [Authorize]
        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var imovel = _context.Imoveis.Find(id);
            if (imovel == null) return NotFound();
            return Ok(imovel);
        }

        // POST: api/imovel
        [Authorize(Roles = "admin")]
        [HttpPost]
        public IActionResult Create([FromBody] Imovel imovel)
        {
            _context.Imoveis.Add(imovel);
            _context.SaveChanges();
            return CreatedAtAction(nameof(GetById), new { id = imovel.Id }, imovel);
        }

        // PUT: api/imovel/{id}
        [Authorize(Roles = "admin")]
        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody] Imovel imovel)
        {
            var existing = _context.Imoveis.Find(id);
            if (existing == null) return NotFound();

            existing.Endereco = imovel.Endereco;
            existing.Preco = imovel.Preco;
            existing.Descricao = imovel.Descricao;
            existing.Area = imovel.Area;
            existing.NumeroQuartos = imovel.NumeroQuartos;
            existing.NumeroBanheiros = imovel.NumeroBanheiros;
            existing.TemGaragem = imovel.TemGaragem;

            _context.SaveChanges();
            return NoContent();
        }

        // DELETE: api/imovel/{id}
        [Authorize(Roles = "admin")]
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var imovel = _context.Imoveis.Find(id);
            if (imovel == null) return NotFound();

            _context.Imoveis.Remove(imovel);
            _context.SaveChanges();
            return NoContent();
        }

        // Adiciona fotos ao imóvel (somente admin)
        [Authorize(Roles = "admin")]
        [HttpPost("{imovelId}/fotos")]
        public IActionResult AdicionarFoto(int imovelId, [FromBody] Foto foto)
        {
            var imovel = _context.Imoveis.Find(imovelId);
            if (imovel == null) return NotFound();

            foto.ImovelId = imovelId;
            _context.Fotos.Add(foto);
            _context.SaveChanges();
            return Ok(foto);
        }

        // Lista fotos do imóvel (qualquer usuário autenticado)
        [Authorize]
        [HttpGet("{imovelId}/fotos")]
        public IActionResult ListarFotos(int imovelId)
        {
            var fotos = _context.Fotos.Where(f => f.ImovelId == imovelId).ToList();
            return Ok(fotos);
        }

        // Endpoint para agendar visita, permitido a usuários padrão
        [Authorize(Roles = "usuario")]
        [HttpPost("{imovelId}/agendar")]
        public IActionResult AgendarVisita(int imovelId)
        {
            // implementação para agendar visita (salva no banco, envia notificação etc)
            return Ok(new { mensagem = "Visita agendada com sucesso!" });
        }
    }
}
