import { openDb } from "../configDB.js";

export async function insereUsuario(usuario){
    try{
        const db = await openDb();

        //todo: Eventualmente, se esse projeto for adiante, seria importante CRIPTOGRAFAR a senha antes de salvar. 
        //      Isso é o mínimo sobre segurança ao guardar informações sensíveis
        //      por hora, enquanto for um projeto simples de faculdade, está tudo bem persistir a informação desta forma (em plain text, sem criptografia).
        await db.run(`INSERT INTO Conta (nome_usuario, senha, nome) VALUES ('${usuario.nomeUsuario}', '${usuario.senha}', '${usuario.nome}');`);
        await db.close();
        return true;
    } catch (error) {
        console.error("Erro:", error);
        return false;
    }
}

export async function atualizaUsuario(usuario){
    
    try{
        const db = await openDb();
        await db.run(`UPDATE Conta 
            SET nome_usuario = '${usuario.nomeUsuario}', 
            senha = '${usuario.senha}', 
            nome = '${usuario.nome}'
            where Id_conta = ${usuario.id_conta};`);
        await db.close();
        return true;
    } catch (error) {
        console.error("Erro:", error);
        return false;
    }
}

export async function deletaUsuario(usuario){
    try{
        const db = await openDb();
        await db.run(`DELETE FROM Conta where Id_conta = ${usuario.id_conta};`);
        await db.close();
        return true;
    } catch (error) {
        console.error("Erro:", error);
        return false;
    }
}