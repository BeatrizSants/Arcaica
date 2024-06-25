import {buscaUsuarioParaLoginSQL} from '../sql/usuario.js';
import jwt from 'jsonwebtoken';

const jwtSecret = '3KHnervQCxzmTi6cl8gIbg==';
const duracaoHorasToken = 1;

export const loginUser = (req, res) => {
    const { usuario, senha } = req.body;

    // Verifica usuario e senha
    if (!usuario || !senha) {
        return res.status(400).json({ message: 'Usuário e senha são necessários.' });
    }

    const user = buscaUsuarioParaLoginSQL(usuario, senha);

    if (!user) {
        return res.status(401).json({ message: 'Usuário ou senha inválidos.' });
    }

    const token = jwt.sign({ userId: usuario.Id_conta, username: user.usuario }, jwtSecret, { expiresIn: `${duracaoHorasToken}h` });
    res.json({ message: `Usuário "${usuario}" autenticado com sucesso`, token });
};


export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Token de autorização não fornecido no cabeçalho da requisição.' });
    }

    jwt.verify(token, jwtSecret, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Token Inválido' });
        }
        req.user = decoded; // Adiciona info de usuário decondificadoa ao objeto de requisição
        next();             // Continua para a próximo middleware ou route handler
    });
};