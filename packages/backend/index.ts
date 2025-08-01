// packages/backend/index.ts
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import workflowRoutes from './routes/workflows';
import { executeWorkflow } from './executor/executeWorkflow';
import mockWorkflow from './executor/mockWorkflow';

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

app.use(workflowRoutes);

app.post('/api/run-workflow', async (req, res) => {
  try {
    const result = await executeWorkflow(req.body);
    res.json({ status: 'ok', result });
  } catch (e) {
    res.status(500).json({ status: 'error', message: (e as Error).message });
  }
});

app.listen(port, () => {
  console.log(`🚀 Backend running on http://localhost:${port}`);
});
