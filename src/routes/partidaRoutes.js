
import express from 'express';
import { cadastraPartida, atualizaPartida, deletaPartida } from '../../controllers/partidaController.js'; 
import {authenticateToken} from '../../controllers/authController.js'; 

const router = express.Router();

router.post('/cadastra', authenticateToken, cadastraPartida);
router.put('/atualiza',  authenticateToken, atualizaPartida);
router.delete('/deleta', authenticateToken, deletaPartida);

export default router;