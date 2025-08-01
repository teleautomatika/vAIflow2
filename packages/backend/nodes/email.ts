mport { WorkflowNode } from '../types';

export async function runEmailNode(node: WorkflowNode, input: any[]) {
  console.log(`📧 Enviando e-mail para ${node.config?.to}`);
  return {
    status: 'sent',
    to: node.config?.to,
    subject: node.config?.subject,
    body: node.config?.body,
  };
}
