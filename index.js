import {openDb} from './configDB.js';

const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();
const porta = 3000;

openDb();

// ========================== ROTAS GET - Páginas  =========================== 
// (estes endpoints não têm regra de negócio, apenas retornam cópias dos htmls pro navegador do cliente usar. Muito simples)
router.get('/',function(req,res){
    res.sendFile(path.join(__dirname+'/paginas/home.html'));
});
router.get('/login',function(req,res){
    res.sendFile(path.join(__dirname+'/paginas/login.html'));
});
router.get('/about',function(req,res){
    res.sendFile(path.join(__dirname+'/paginas/about.html'));
});
router.get('/game_selection',function(req,res){
    res.sendFile(path.join(__dirname+'/paginas/game_selection.html'));
});
router.get('/settings',function(req,res){
    res.sendFile(path.join(__dirname+'/paginas/configuracoes.html'));
});

//TODO: Rodar uma instância local do mysql e conectar. (Somente assim conseguiremos fazer login, salvar e recuperar pontuações, etc...)
//TODO: FAZER ENDPOINTS DE LOGIN!
//TODO: Dentre vários outros, completar os seguintes enpoints:
router.get('/recupera_pontuacao',function(req,res){
    console.log(`TODO: Implementar conexão com banco e buscar pontuação (organizar e formatar os dados, etc). Retornar um json!`);
});
router.post('/salva_pontuacao',function(req,res){
    //    .
    //   /|\
    //    |
    //obs |___(perceba que o endpoint de salvar é um POST, diferente daqueles que apenas buscam dados - os GETS)
    console.log(`TODO: Implementar conexão com banco e salvar pontuação na tabela correta. Retornar status 200 se ok.`);
    //obs 2: posts (e qualquer requisição na verdade) podem ser testados  pelo software de requisições [[INSOMNIA]] ou [[POSTMAN]]  (o que preferirem. Eu acho o insomnia mais simples)
});
//TODO: Ver quais outros endpoints serão necessários e escrever a regra do back  (Inicialmente a regra de negócio pode ser neste arquivo mesmo)


// ===================================== CONFIGURAÇÕES GLOBAIS DA APLICAÇÃO DO BACKEND ===================================== 
app.use('/',router);
app.use(express.static(__dirname + '/public'));
app.listen(process.env.port || porta);
console.log(`Rodando servidor na porta ${porta}... Acesse em http://127.0.0.1:3000/`);