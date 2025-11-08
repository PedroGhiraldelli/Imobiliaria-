using Microsoft.EntityFrameworkCore;
using Imobiliaria.Models;

namespace Imobiliaria.Infrastructure
{
    public class ImobiliariaDbContext : DbContext
    {
        public ImobiliariaDbContext(DbContextOptions<ImobiliariaDbContext> options)
            : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Imovel> Imoveis { get; set; }
        public DbSet<Foto> Fotos { get; set; }

        public DbSet<Visita> Visitas { get; set; }


        // Outros DbSets conforme necessidade
    }
}
