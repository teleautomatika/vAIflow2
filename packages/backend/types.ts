export type NodeType = 'webhook' | 'email' | 'slack';

export interface WorkflowNode {
  id: string;
  type: NodeType;
  name: string;
  config?: Record<string, any>;
  inputs?: string[];
}

export interface Workflow {
  id: string;
  name: string;
  nodes: WorkflowNode[];
}
