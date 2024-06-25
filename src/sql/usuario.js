import { openDb } from "../configDB.js";

export async function insereUsuarioSQL(usuario){
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

export async function atualizaUsuarioSQL(usuario){
    
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

export async function deletaUsuarioSQL(usuario){
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

export async function buscaUsuarioParaLoginSQL(usuario, senha){
    try{
        const db = await openDb();
        var resultado = await db.get(`SELECT * FROM Conta where nome_usuario = '${usuario}' AND senha = '${senha}';`);
        await db.close();
        console.log(resultado);
        if(!resultado || resultado.length < 1)
            throw new Error(`Usuário "${usuario}" não encontrado`);
        return resultado[0];
    } catch (error) {
        console.error("Erro:", error);
        return false;
    }
}