// routes/auth.js
import express from 'express';
import { getPontuacao, sincronizaPontuacao } from '../../controllers/pontuacaoController.js';
import {authenticateToken} from '../../controllers/authController.js'; 

const router = express.Router();

router.get('/get', getPontuacao);
router.post('/sincroniza', authenticateToken, sincronizaPontuacao)

export default router;