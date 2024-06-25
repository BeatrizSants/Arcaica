
import express from 'express';
import { cadastraUsuario, atualizaUsuario, deletaUsuario } from '../../controllers/usuarioController.js'; 
import {authenticateToken} from '../../controllers/authController.js'; 
const router = express.Router();

router.post('/cadastra', cadastraUsuario);
router.put('/atualiza', authenticateToken, atualizaUsuario);
router.delete('/deleta', authenticateToken, deletaUsuario);

export default router;