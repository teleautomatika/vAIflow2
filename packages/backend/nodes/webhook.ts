// packages/backend/nodes/webhook.ts
import { WorkflowNode } from '../types';

export async function runWebhookNode(node: WorkflowNode, input: any[]) {
  console.log(`🌐 Webhook trigger recebido.`);
  return {
    status: 'received',
    input,
    timestamp: new Date().toISOString(),
  };
}
