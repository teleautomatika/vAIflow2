import express from 'express';
import { Workflow } from '../types';

const router = express.Router();
const workflows: Record<string, Workflow> = {}; // Armazenamento em memória

router.post('/api/workflows', (req, res) => {
  const workflow: Workflow = req.body;
  workflows[workflow.id] = workflow;
  console.log(`✅ Workflow salvo: ${workflow.id}`);
  res.json({ status: 'ok', id: workflow.id });
});

router.get('/api/workflows/:id', (req, res) => {
  const { id } = req.params;
  const workflow = workflows[id];

  if (!workflow) {
    return res.status(404).json({ status: 'error', message: 'Workflow não encontrado' });
  }

  console.log(`📦 Workflow carregado: ${id}`);
  res.json({ status: 'ok', workflow });
});

export default router;
