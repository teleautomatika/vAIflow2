// packages/backend/executor/nodeRunner.ts
import { NodeType, WorkflowNode } from '../types';
import { runEmailNode } from '../nodes/email';
import { runSlackNode } from '../nodes/slack';
import { runWebhookNode } from '../nodes/webhook';

export async function runNode(type: NodeType, node: WorkflowNode, input: any[]) {
  switch (type) {
    case 'email':
      return runEmailNode(node, input);
    case 'slack':
      return runSlackNode(node, input);
    case 'webhook':
      return runWebhookNode(node, input);
    default:
      throw new Error(`Unsupported node type: ${type}`);
  }
}
