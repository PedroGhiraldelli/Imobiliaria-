using Imobiliaria.Models;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Imobiliaria
{
    public class Visita
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int ImovelId { get; set; }
        public Imovel Imovel { get; set; }

        [Required]
        public int UsuarioId { get; set; }
        public User Usuario { get; set; }

        [Required]
        public string UsuarioEmail { get; set; }

        public DateTime DataAgendamento { get; set; } = DateTime.Now;
    }
}
