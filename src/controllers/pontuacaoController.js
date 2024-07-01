
import {buscaPontuacaoPorJogoSQL, salvaPontuacaoSQL, atualizaPontuacaoSQL, getPontuacaoPorContaEJogoSQL} from '../sql/pontuacao.js';
import {getPartidasPorJogoEContaSQL} from '../sql/partida.js';

export const sincronizaPontuacao = async function(req, res){
    try{
        // verifica corpo da req
        if(req && req.body && (!req.body.id_jogo) ){
            res.json({ 'statusCode': 400, 'message': "Requisição com corpo incompleto. 'id_jogo' estão faltantes." });
        }else{
            const id_jogo = req.body.id_jogo;
            const id_conta = req.user;
            const partidas  = await getPartidasPorJogoEContaSQL(id_conta, id_jogo);
            let total = 0;
            //percorre todas as partidas deste usuário neste jogo e soma os pontos em total
            partidas.forEach(partida => {
                total += (partida.pontuacao ? partida.pontuacao : 0);
            });

            // procura se já existe pontuacao
            const pontuacao = await getPontuacaoPorContaEJogoSQL(id_conta, id_jogo);

            // se existir, sincroniza. senão, cria.
            if(pontuacao){
                //atualiza
                const resultado = await atualizaPontuacaoSQL(id_conta, id_jogo, total)
                if (!resultado)
                    res.json({ 'statusCode': 500, 'message': `Erro inesperado` });
                else
                    res.json({ 'statusCode': 200, 'message': "Sumário de pontuações atualizado com sucesso para este usuário neste jogo." }); 
            }else{
                //cria
                const resultado = await salvaPontuacaoSQL(id_conta, id_jogo, total);
                if (!resultado)
                    res.json({ 'statusCode': 500, 'message': `Erro inesperado` });
                else
                    res.json({ 'statusCode': 200, 'message': "Não havia sumário de pontuação existente para o referido usuário neste jogo. "
                                                            +" -> Sumário de pontuações criado com sucesso." }); 
            }
        }

    }catch(ex){
        res.json({ 'statusCode': 500, 'message': `Erro inesperado` });
    }
};

export const getPontuacao = async (req, res) => {
    const ranking = await buscaPontuacaoPorJogoSQL(req.body.id_jogo);

    res.json({ message: "ranking recuperado com sucesso", ranking: ranking});
};
