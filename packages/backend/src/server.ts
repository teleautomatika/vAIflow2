import express from 'express';
import bodyParser from 'body-parser';
import { registerMockWorkflowRoute } from './engine/NodeRunner';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(bodyParser.json());

// Rota de execução de workflow mockado
registerMockWorkflowRoute(app);

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
