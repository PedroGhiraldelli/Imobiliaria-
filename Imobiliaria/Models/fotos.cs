using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization; // adicione este using

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
        [JsonIgnore]
        public Imovel Imovel { get; set; }
    }
}
