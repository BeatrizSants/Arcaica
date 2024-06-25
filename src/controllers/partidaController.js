
import {inserePartidaSQL, atualizaPartidaSQL, deletaPartidaSQL} from '../sql/partida.js';


export const cadastraPartida = async function(req,res){
    try{
        // verifica corpo da req
        if(req && req.body && (!req.body.id_jogo || !req.body.id_conta_1) ){
            res.json({ 'statusCode': 500, 'message': "Requisição com corpo incompleto. 'id_jogo' ou 'id_conta_1' estão faltantes." });
        }else{
            req.body.id_conta_2 = req.body.id_conta_2 ? req.body.id_conta_2 : 'NULL';
    
            const resultado = await inserePartidaSQL(req.body);
            if (!resultado)
                res.json({ 'statusCode': 500, 'message': `Erro inesperado` });
            else
                res.json({ 'statusCode': 200, 'message': "Partida cadastrada com sucesso" }); 
        }

    }catch(ex){
        res.json({ 'statusCode': 500, 'message': `Erro inesperado` });
    }
};

export const atualizaPartida = async function(req,res){
    try{
        // verifica corpo da req
        if(req && req.body && (!req.body.id_jogo || !req.body.id_conta_1 || !req.body.id_partida) ){
            res.json({ 'statusCode': 500, 'message': "Requisição com corpo incompleto. 'id_jogo', 'id_conta_1' ou 'id_partida' estão faltantes." });
        }else{

            req.body.id_conta_2 = req.body.id_conta_2 ? req.body.id_conta_2 : 'NULL';
    
            const resultado = await atualizaPartidaSQL(req.body);
            if (!resultado)
                res.json({ 'statusCode': 500, 'message': `Erro inesperado` });
            else
                res.json({ 'statusCode': 200, 'message': "Partida atualizada com sucesso" }); 
        }
    }catch(ex){
        res.json({ 'statusCode': 500, 'message': `Erro inesperado` });
    }
};

export const deletaPartida = async function(req,res){
    try{
        // verifica corpo da req
        if(req && req.body && !req.body.id_partida)
            res.json({ 'statusCode': 500, 'message': "Requisição com corpo incompleto. 'id_partida' faltante." });

        req.body.id_conta_2 = req.body.id_conta_2 ? req.body.id_conta_2 : 'NULL';

        const resultado = await deletaPartidaSQL(req.body);
        if (!resultado)
            res.json({ 'statusCode': 500, 'message': `Erro inesperado` });
        else
            res.json({ 'statusCode': 200, 'message': "Partida deletada com sucesso" }); 
    }catch(ex){
        res.json({ 'statusCode': 500, 'message': `Erro inesperado` });
    }
};