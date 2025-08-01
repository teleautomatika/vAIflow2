// packages/backend/executor/executeWorkflow.ts
import { NodeType, Workflow } from '../types';
import { runNode } from './nodeRunner';

export async function executeWorkflow(workflow: Workflow) {
  const results: Record<string, any> = {};

  for (const node of workflow.nodes) {
    const input = node.inputs?.map(id => results[id]) || [];
    const result = await runNode(node.type as NodeType, node, input);
    results[node.id] = result;
  }

  return results;
}
