import { WorkflowNode } from '../types';

export async function runSlackNode(node: WorkflowNode, input: any[]) {
  console.log(`💬 Enviando mensagem para Slack channel ${node.config?.channel}`);
  return {
    status: 'sent',
    channel: node.config?.channel,
    message: node.config?.message,
  };
}
