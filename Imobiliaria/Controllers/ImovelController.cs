using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using Imobiliaria.Infrastructure;
using Imobiliaria.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore; // Importante para usar .Include

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
            var imoveis = _context.Imoveis
                .Include(i => i.Fotos) // Inclui as fotos no retorno
                .ToList();
            return Ok(imoveis);
        }

        // GET: api/imovel/{id}
        [Authorize]
        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var imovel = _context.Imoveis
                .Include(i => i.Fotos) // Inclui fotos também ao buscar por ID
                .FirstOrDefault(i => i.Id == id);
            if (imovel == null) return NotFound();
            return Ok(imovel);
        }

        // POST: api/imovel
        [Authorize(Roles = "admin")]
        [HttpPost]
        public async Task<IActionResult> Post([FromForm] ImovelCreateDto imovel)
        {
            // Salvar os dados básicos
            var novoImovel = new Imovel
            {
                Endereco = imovel.Endereco,
                Preco = imovel.Preco,
                Area = imovel.Area,
                NumeroQuartos = imovel.NumeroQuartos,
                NumeroBanheiros = imovel.NumeroBanheiros,
                TemGaragem = imovel.TemGaragem,
                VagasGaragem = imovel.VagasGaragem,
                Descricao = imovel.Descricao,
                Fotos = new List<Foto>()
            };

            // Salvar imagens
            if (imovel.Imagens != null)
            {
                foreach (var file in imovel.Imagens)
                {
                    if (file.Length > 0)
                    {
                        // Exemplo: Salva no disco/local e guarda URL
                        var filePath = Path.Combine("wwwroot/fotos", file.FileName);
                        using (var stream = new FileStream(filePath, FileMode.Create))
                        {
                            await file.CopyToAsync(stream);
                        }
                        string url = "/fotos/" + file.FileName;
                        novoImovel.Fotos.Add(new Foto { Url = url });
                    }
                }
            }

            _context.Imoveis.Add(novoImovel);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetById), new { id = novoImovel.Id }, novoImovel);
        }

        // PUT: api/imovel/{id}
        [Authorize(Roles = "admin")]
        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromForm] ImovelCreateDto imovel)
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
