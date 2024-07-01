import { openDb } from "../configDB.js";

export async function buscaPontuacaoPorJogoSQL(Id_jogo){
    try{
        const db = await openDb();
        console.log("Buscando ranking do jogo " + Id_jogo);
        var resultado = await db.all(`SELECT * FROM Pontuacao where Id_jogo = ${Id_jogo} and single_player=1 order by pontuacao desc;`);
        await db.close();
        if (!resultado) {
            throw new Error(`Nenhuma partida deste jogo foi executada ainda`);
        }
        return resultado;
    } catch (error) {
        console.error("Erro:", error);
        return false;
    }
}

export async function getPontuacaoPorContaEJogoSQL(Id_conta, Id_jogo){
    try{
        const db = await openDb();
        var resultado = await db.get(`SELECT * FROM Pontuacao where Id_conta = ${Id_conta} and Id_jogo = ${Id_jogo} and single_player=1 order by pontuacao desc;`);
        await db.close();
        if (!resultado) {
            throw new Error(`Nenhuma partida deste jogo foi executada por este usuário ainda`);
        }
        return resultado;
    } catch (error) {
        console.error("Erro:", error);
        return false;
    }
}


export async function salvaPontuacaoSQL(Id_conta, Id_jogo, pontuacao){
    try{
        const db = await openDb();
        await db.run(`INSERT INTO Pontuacao (Id_jogo, Id_conta, single_player, pontuacao) 
            VALUES (${Id_jogo}, ${Id_conta}, 1, ${pontuacao});`);
        await db.close();
        return true;
    } catch (error) {
        console.error("Erro:", error);
        return false;
    }
}

export async function atualizaPontuacaoSQL(Id_conta, Id_jogo, pontuacao){
    try{
        const db = await openDb();
        await db.run(`UPDATE Pontuacao 
            SET pontuacao = ${pontuacao}
            where Id_conta = ${Id_conta} and Id_jogo = ${Id_jogo};`);
        await db.close();
        return true;
    } catch (error) {
        console.error("Erro:", error);
        return false;
    }
}