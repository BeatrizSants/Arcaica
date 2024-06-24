import {openDb, criaDatabase} from './configDB.js';
import {insereUsuario, atualizaUsuario, deletaUsuario} from './controller/Usuario.js'
import {inserePartida, atualizaPartida, deletaPartida} from './controller/Partida.js'
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());

const porta = 3000;

console.log("Tentando conectar ao banco SQLite ...");
openDb();
console.log("Conexão estabelecida com o banco SQLite!");
console.log("Criando a base de dados, se ainda não existir ...");
criaDatabase();
console.log("Base criada ou mantida!");

// ========================== ROTAS GET - Páginas  =========================== 
// (estes endpoints não têm regra de negócio, apenas retornam cópias dos htmls pro navegador do cliente usar. Muito simples)
app.get('/',function(req,res){
    console.log("Requisição p/ tela de home recebida");
    res.sendFile(path.join(__dirname+'/paginas/home.html'));
});
app.get('/login',function(req,res){
    console.log("Requisição p/ tela de login recebida");
    res.sendFile(path.join(__dirname+'/paginas/login.html'));
});
app.get('/about',function(req,res){
    console.log("Requisição p/ tela de about recebida");
    res.sendFile(path.join(__dirname+'/paginas/about.html'));
});
app.get('/game_selection',function(req,res){
    console.log("Requisição p/ tela de game selection recebida");
    res.sendFile(path.join(__dirname+'/paginas/game_selection.html'));
});
app.get('/settings',function(req,res){
    console.log("Requisição p/ tela de settings recebida");
    res.sendFile(path.join(__dirname+'/paginas/configuracoes.html'));
});

//TODO: FAZER ENDPOINTS DE LOGIN!

app.post('/cadastra_usuario', async function(req, res){
    try{
        // verifica corpo da req
        if(req && req.body && (!req.body.nomeUsuario || !req.body.nome || !req.body.senha) ){
            res.json({ 'statusCode': 500, 'message': "Requisição com corpo incompleto. 'nomeUsuario', 'nome' ou 'senha' estão faltantes." });
        }else{
            const resultado = await insereUsuario(req.body);
            if (!resultado)
                res.json({ 'statusCode': 500, 'message': `Erro inesperado` });
            else
                res.json({ 'statusCode': 200, 'message': "Usuário cadastrado com sucesso" }); 
        }

    }catch(ex){
        res.json({ 'statusCode': 500, 'message': `Erro inesperado` });
    }
});

app.put('/atualiza_usuario', async function(req, res){
    try{
        // verifica corpo da req
        if(req && req.body && (!req.body.nomeUsuario || !req.body.nome || !req.body.senha || !req.body.id_conta) ){
            res.json({ 'statusCode': 500, 'message': "Requisição com corpo incompleto. 'id_conta', 'nomeUsuario', 'nome' ou 'senha' estão faltantes." });
        }else{
            const resultado = await atualizaUsuario(req.body);
            if (!resultado)
                res.json({ 'statusCode': 500, 'message': `Erro inesperado` });
            else
                res.json({ 'statusCode': 200, 'message': "Usuário atualizado com sucesso" }); 
        }

    }catch(ex){
        res.json({ 'statusCode': 500, 'message': `Erro inesperado` });
    }
});

app.delete('/deleta_usuario', async function(req, res){
    try{
        // verifica corpo da req
        if(req && req.body && !req.body.id_conta ){
            res.json({ 'statusCode': 500, 'message': "Requisição com corpo incompleto. 'id_conta' está faltante." });
        }else{
            const resultado = await deletaUsuario(req.body);
            if (!resultado)
                res.json({ 'statusCode': 500, 'message': `Erro inesperado.` });
            else
                res.json({ 'statusCode': 200, 'message': "Usuário deletado com sucesso" }); 
        }
    }catch(ex){
        res.json({ 'statusCode': 500, 'message': `Erro inesperado` });
    }
});


//TODO:
app.get('/recupera_pontuacao',function(req,res){
    console.log(`TODO: Implementar conexão com banco e buscar pontuação (organizar e formatar os dados, etc). Retornar um json!`);
});


app.post('/cadastra_partida', async function(req,res){
    try{
        // verifica corpo da req
        if(req && req.body && (!req.body.id_jogo || !req.body.id_conta_1) ){
            res.json({ 'statusCode': 500, 'message': "Requisição com corpo incompleto. 'id_jogo' ou 'id_conta_1' estão faltantes." });
        }else{
            req.body.id_conta_2 = req.body.id_conta_2 ? req.body.id_conta_2 : 'NULL';
    
            const resultado = await inserePartida(req.body);
            if (!resultado)
                res.json({ 'statusCode': 500, 'message': `Erro inesperado` });
            else
                res.json({ 'statusCode': 200, 'message': "Partida cadastrada com sucesso" }); 
        }

    }catch(ex){
        res.json({ 'statusCode': 500, 'message': `Erro inesperado` });
    }
});

app.put('/atualiza_partida', async function(req,res){
    try{
        // verifica corpo da req
        if(req && req.body && (!req.body.id_jogo || !req.body.id_conta_1 || !req.body.id_partida) ){
            res.json({ 'statusCode': 500, 'message': "Requisição com corpo incompleto. 'id_jogo', 'id_conta_1' ou 'id_partida' estão faltantes." });
        }else{

            req.body.id_conta_2 = req.body.id_conta_2 ? req.body.id_conta_2 : 'NULL';
    
            const resultado = await atualizaPartida(req.body);
            if (!resultado)
                res.json({ 'statusCode': 500, 'message': `Erro inesperado` });
            else
                res.json({ 'statusCode': 200, 'message': "Partida atualizada com sucesso" }); 
        }
    }catch(ex){
        res.json({ 'statusCode': 500, 'message': `Erro inesperado` });
    }
});

app.delete('/deleta_partida', async function(req,res){
    try{
        // verifica corpo da req
        if(req && req.body && !req.body.id_partida)
            res.json({ 'statusCode': 500, 'message': "Requisição com corpo incompleto. 'id_partida' faltante." });

        req.body.id_conta_2 = req.body.id_conta_2 ? req.body.id_conta_2 : 'NULL';

        const resultado = await deletaPartida(req.body);
        if (!resultado)
            res.json({ 'statusCode': 500, 'message': `Erro inesperado` });
        else
            res.json({ 'statusCode': 200, 'message': "Partida deletada com sucesso" }); 
    }catch(ex){
        res.json({ 'statusCode': 500, 'message': `Erro inesperado` });
    }
});

// ===================================== CONFIGURAÇÕES GLOBAIS DA APLICAÇÃO DO BACKEND ===================================== 
app.use(express.static(__dirname + '/public'));
app.listen(porta, () => console.log(`Rodando servidor na porta ${porta}... Acesse em http://127.0.0.1:3000/`));