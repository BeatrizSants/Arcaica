import { openDb } from "../configDB.js";

export async function inserePartida(partida){
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

export async function atualizaPartida(partida){
    
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

export async function deletaPartida(partida){
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