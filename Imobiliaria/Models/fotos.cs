using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Imobiliaria.Models
{
    public class Foto
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Url { get; set; } // caminho ou URL da foto

        [ForeignKey("Imovel")]
        public int ImovelId { get; set; }

        public Imovel Imovel { get; set; }
    }
}
