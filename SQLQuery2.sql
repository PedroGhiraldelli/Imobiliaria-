SELECT TOP (1000) [Id]
      ,[Nome]
      ,[Email]
      ,[SenhaHash]
      ,[Perfil]
  FROM [ImobiliariaDb].[dbo].[Users]


  ALTER TABLE Imoveis ADD VagasGaragem INT NOT NULL DEFAULT 0
