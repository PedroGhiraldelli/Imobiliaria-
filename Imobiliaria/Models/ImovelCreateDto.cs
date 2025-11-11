using Microsoft.AspNetCore.Http;
using System.Collections.Generic;

public class ImovelCreateDto
{
    public string Endereco { get; set; }
    public decimal Preco { get; set; }
    public double Area { get; set; }
    public int NumeroQuartos { get; set; }
    public int NumeroBanheiros { get; set; }
    public bool TemGaragem { get; set; } = false;
    public int VagasGaragem { get; set; }
    public string Descricao { get; set; }
    public List<IFormFile> Imagens { get; set; }
}
