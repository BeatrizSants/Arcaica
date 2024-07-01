import {buscaUsuarioParaLoginSQL} from '../sql/usuario.js';
import jwt from 'jsonwebtoken';

const jwtSecret = '3KHnervQCxzmTi6cl8gIbg==';
const duracaoHorasToken = 1;

export const loginUser = async (req, res) => {
    const { usuario, senha } = req.body;

    // Verifica usuario e senha
    if (!usuario || !senha) {
        return res.status(400).json({ message: 'Usuário e senha são necessários.' });
    }

    const usuario_obtido = await buscaUsuarioParaLoginSQL(usuario, senha);
    if (!usuario_obtido) {
        return res.status(401).json({ message: 'Usuário ou senha inválidos.' });
    }else{
        console.log(`usuário: ${usuario_obtido.nome_usuario} encontrado para a referida senha`);
    }

    const token = jwt.sign({ userId: usuario_obtido.Id_conta, username: usuario_obtido.usuario }, jwtSecret, { expiresIn: `${duracaoHorasToken}h` });
    res.json({ message: `Bem-vindo, "${usuario}"!`, token });
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
        const { userId, username } = decoded;
        req.user = userId;
        next();             // Continua para a próximo middleware ou route handler
    });
};