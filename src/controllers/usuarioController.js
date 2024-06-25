
import {insereUsuarioSQL, atualizaUsuarioSQL, deletaUsuarioSQL} from '../sql/usuario.js';

export const cadastraUsuario = async function(req, res){
    try{
        // verifica corpo da req
        if(req && req.body && (!req.body.nomeUsuario || !req.body.nome || !req.body.senha) ){
            res.json({ 'statusCode': 500, 'message': "Requisição com corpo incompleto. 'nomeUsuario', 'nome' ou 'senha' estão faltantes." });
        }else{
            const resultado = await insereUsuarioSQL(req.body);
            if (!resultado)
                res.json({ 'statusCode': 500, 'message': `Erro inesperado` });
            else
                res.json({ 'statusCode': 200, 'message': "Usuário cadastrado com sucesso" }); 
        }

    }catch(ex){
        res.json({ 'statusCode': 500, 'message': `Erro inesperado` });
    }
};

export const atualizaUsuario =  async function(req, res){
    try{
        // verifica corpo da req
        if(req && req.body && (!req.body.nomeUsuario || !req.body.nome || !req.body.senha || !req.body.id_conta) ){
            res.json({ 'statusCode': 500, 'message': "Requisição com corpo incompleto. 'id_conta', 'nomeUsuario', 'nome' ou 'senha' estão faltantes." });
        }else{
            const resultado = await atualizaUsuarioSQL(req.body);
            if (!resultado)
                res.json({ 'statusCode': 500, 'message': `Erro inesperado` });
            else
                res.json({ 'statusCode': 200, 'message': "Usuário atualizado com sucesso" }); 
        }

    }catch(ex){
        res.json({ 'statusCode': 500, 'message': `Erro inesperado` });
    }
};

export const deletaUsuario =  async function(req, res){
    try{
        // verifica corpo da req
        if(req && req.body && !req.body.id_conta ){
            res.json({ 'statusCode': 500, 'message': "Requisição com corpo incompleto. 'id_conta' está faltante." });
        }else{
            const resultado = await deletaUsuarioSQL(req.body);
            if (!resultado)
                res.json({ 'statusCode': 500, 'message': `Erro inesperado.` });
            else
                res.json({ 'statusCode': 200, 'message': "Usuário deletado com sucesso" }); 
        }
    }catch(ex){
        res.json({ 'statusCode': 500, 'message': `Erro inesperado` });
    }
};