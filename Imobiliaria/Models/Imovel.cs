using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using Imobiliaria.Models; // se a classe Foto estiver em outro arquivo/pasta

namespace Imobiliaria.Models
{
    public class Imovel
    {
        [Key]
        public int Id { get; set; }

        [Required(ErrorMessage = "O endereço é obrigatório")]
        [StringLength(200, ErrorMessage = "O endereço não pode ter mais que 200 caracteres")]
        public string Endereco { get; set; }

        [Required(ErrorMessage = "O preço é obrigatório")]
        [Range(0, double.MaxValue, ErrorMessage = "O preço deve ser maior que zero")]
        public decimal Preco { get; set; }

        [StringLength(1000, ErrorMessage = "A descrição não pode exceder 1000 caracteres")]
        public string Descricao { get; set; }

        [Required(ErrorMessage = "A área é obrigatória")]
        public double Area { get; set; }  // área em metros quadrados

        [Required(ErrorMessage = "O número de quartos é obrigatório")]
        public int NumeroQuartos { get; set; }

        [Required(ErrorMessage = "O número de banheiros é obrigatório")]
        public int NumeroBanheiros { get; set; }

        [Required(ErrorMessage = "Seleção de garagem é obrigatória")]
        public bool TemGaragem { get; set; }

        public int VagasGaragem { get; set; }

        public ICollection<Foto> Fotos { get; set; } = new List<Foto>();


        public DateTime DataCadastro { get; set; } = DateTime.Now;
    }
}



