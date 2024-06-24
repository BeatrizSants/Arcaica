import sqlite3 from 'sqlite3'
import { open } from 'sqlite'

// Abre conexão com o sqlite -> (sqlite é uma base de dados simples em um único arquivo .db)
export async function openDb () {
  return open({
    filename: './database.db',
    driver: sqlite3.Database
  })
}


// Função de criação do banco e insert de alguns registros básicos (usuário e jogos).
export async function criaDatabase(){
  openDb().then(db => {
      // O script foi gerado pelo MySQL workbench e adaptado para a sintaxe do SQLite
      var scriptCriacao = `
        PRAGMA foreign_keys = ON; -- Habilita chaves estrangeiras, por padrão SQLite as desabilita.

        -- -----------------------------------------------------
        -- Table 'Conta'
        -- -----------------------------------------------------
        CREATE TABLE IF NOT EXISTS Conta (
          nome_usuario VARCHAR(45) NOT NULL,
          senha VARCHAR(45) NOT NULL,
          nome VARCHAR(45) NOT NULL,
          Id_conta INTEGER PRIMARY KEY AUTOINCREMENT
        );


        -- -----------------------------------------------------
        -- Table 'Jogo'
        -- -----------------------------------------------------
        CREATE TABLE IF NOT EXISTS Jogo (
          nome_jogo VARCHAR(45) NOT NULL,
          Id_jogo INTEGER PRIMARY KEY AUTOINCREMENT
        );


        -- -----------------------------------------------------
        -- Table 'Partidas'
        -- -----------------------------------------------------
        CREATE TABLE IF NOT EXISTS Partidas (
          Id_partida INTEGER PRIMARY KEY AUTOINCREMENT,
          Id_jogo INT NOT NULL,
          Id_conta_1 INT NOT NULL,
          Id_conta_2 INT,
          pontuacao INT NOT NULL,
          FOREIGN KEY (Id_jogo) REFERENCES Jogo(Id_jogo) ON DELETE NO ACTION ON UPDATE NO ACTION,
          FOREIGN KEY (Id_conta_1) REFERENCES Conta(Id_conta) ON DELETE NO ACTION ON UPDATE NO ACTION,
          FOREIGN KEY (Id_conta_2) REFERENCES Conta(Id_conta) ON DELETE NO ACTION ON UPDATE NO ACTION
        );


        -- -----------------------------------------------------
        -- Table 'Pontuacao'
        -- -----------------------------------------------------
        CREATE TABLE IF NOT EXISTS Pontuacao (
          Id_Pontuacao INTEGER PRIMARY KEY AUTOINCREMENT,
          Id_jogo INT NOT NULL,
          Id_conta INT NOT NULL,
          single_player INTEGER NOT NULL,
          pontuacao INT NOT NULL,
          FOREIGN KEY (Id_jogo) REFERENCES Jogo(Id_jogo) ON DELETE NO ACTION ON UPDATE NO ACTION,
          FOREIGN KEY (Id_conta) REFERENCES Conta(Id_conta) ON DELETE NO ACTION ON UPDATE NO ACTION
        );


        -- -----------------------------------------------------
        -- Data for table 'Conta'
        -- -----------------------------------------------------
        INSERT OR IGNORE INTO Conta (nome_usuario, senha, nome, Id_conta) VALUES ('admin', '123', 'Admin', 1);


        -- -----------------------------------------------------
        -- Data for table 'Jogo'
        -- -----------------------------------------------------
        INSERT OR IGNORE INTO Jogo (nome_jogo, Id_jogo) VALUES ('Jogo da Velha', 1);
        INSERT OR IGNORE INTO Jogo (nome_jogo, Id_jogo) VALUES ('Campo Minado', 2);
        INSERT OR IGNORE INTO Jogo (nome_jogo, Id_jogo) VALUES ('Dama', 3);

      `;

      db.exec(scriptCriacao);
  });
}