import { openDb } from "../configDB.js";

export async function inserePartidaSQL(partida){
    try{
        const db = await openDb();
        await db.run(`INSERT INTO Partidas (Id_jogo, Id_conta_1, Id_conta_2, pontuacao) 
            VALUES (${partida.id_jogo}, ${partida.id_conta_1}, ${partida.id_conta_2}, ${partida.pontuacao});`);
        await db.close();
        return true;
    } catch (error) {
        console.error("Erro:", error);
        return false;
    }
}

export async function atualizaPartidaSQL(partida){
    
    try{
        const db = await openDb();
        await db.run(`UPDATE Partidas 
            SET Id_jogo = ${partida.id_jogo}, 
            Id_conta_1 = ${partida.id_conta_1}, 
            Id_conta_2 = ${partida.id_conta_2}, 
            pontuacao = ${partida.pontuacao}
            where Id_partida = ${partida.id_partida};`);
        await db.close();
        return true;
    } catch (error) {
        console.error("Erro:", error);
        return false;
    }
}

export async function deletaPartidaSQL(partida){
    try{
        const db = await openDb();
        await db.run(`DELETE FROM Partidas where Id_partida = ${partida.id_partida};`);
        await db.close();
        return true;
    } catch (error) {
        console.error("Erro:", error);
        return false;
    }
}

export async function getPartidasPorJogoEContaSQL(Id_conta,Id_jogo){
    try{
        const db = await openDb();
        console.log("Buscando ranking do jogo " + Id_jogo);
        var resultado = await db.all(`SELECT * FROM Partidas where Id_jogo = ${Id_jogo} and Id_conta_1 = ${Id_conta} and Id_conta_2 = NULL order by pontuacao desc;`);
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