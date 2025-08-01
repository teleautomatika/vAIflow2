// packages/frontend/src/pages/Editor.tsx
import React, { useCallback, useState } from 'react';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  addEdge,
  useNodesState,
  useEdgesState,
  Connection,
  Edge,
  Node,
  NodeChange
} from 'reactflow';
import 'reactflow/dist/style.css';

const initialNodes = [
  {
    id: '1',
    type: 'input',
    data: { label: 'Webhook Trigger', method: 'POST', endpoint: '/webhook' },
    position: { x: 50, y: 50 },
  },
  {
    id: '2',
    type: 'default',
    data: { label: 'Slack Message', channel: '#general', message: 'Hello from vAIflow!' },
    position: { x: 300, y: 150 },
  },
];

const initialEdges = [
  { id: 'e1-2', source: '1', target: '2', animated: true },
];

export default function EditorPage() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [runResult, setRunResult] = useState<any>(null);
  const [workflowId, setWorkflowId] = useState<string | null>(null);

  const onConnect = useCallback((params: Edge | Connection) => {
    setEdges((eds) => addEdge(params, eds));
  }, [setEdges]);

  const onNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
    setSelectedNodeId(node.id);
  }, []);

  const handleFieldChange = (field: string, value: string) => {
    setNodes((nds) =>
      nds.map((node) =>
        node.id === selectedNodeId
          ? { ...node, data: { ...node.data, [field]: value } }
          : node
      )
    );
  };

  const handleRunWorkflow = () => {
    fetch('http://localhost:3000/api/run-workflow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nodes, edges }),
    })
      .then((res) => res.json())
      .then((data) => {
        setRunResult(data.result);
        alert(`Execução iniciada: ${data.status}`);
      })
      .catch((err) => {
        console.error('Erro ao rodar workflow:', err);
        alert('Erro ao rodar workflow');
      });
  };

  const handleSaveWorkflow = () => {
    fetch('http://localhost:3000/api/workflows', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nodes, edges }),
    })
      .then((res) => res.json())
      .then((data) => {
        setWorkflowId(data.id);
        alert(`Workflow salvo com ID: ${data.id}`);
      })
      .catch((err) => {
        console.error('Erro ao salvar workflow:', err);
        alert('Erro ao salvar workflow');
      });
  };

  const handleLoadWorkflow = () => {
    const id = prompt('Digite o ID do workflow:');
    if (!id) return;

    fetch(`http://localhost:3000/api/workflows/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.workflow) {
          setNodes(data.workflow.nodes);
          setEdges(data.workflow.edges);
          setWorkflowId(id);
          alert('Workflow carregado com sucesso!');
        }
      })
      .catch((err) => {
        console.error('Erro ao carregar workflow:', err);
        alert('Erro ao carregar workflow');
      });
  };

  const selectedNode = nodes.find((node) => node.id === selectedNodeId);

  const renderCustomFields = () => {
    if (!selectedNode) return null;
    switch (selectedNode.data.label) {
      case 'Webhook Trigger':
        return (
          <>
            <label>Método:</label>
            <input
              type="text"
              value={selectedNode.data.method || ''}
              onChange={(e) => handleFieldChange('method', e.target.value)}
              style={{ width: '100%', padding: '6px', marginTop: 8 }}
            />
            <label>Endpoint:</label>
            <input
              type="text"
              value={selectedNode.data.endpoint || ''}
              onChange={(e) => handleFieldChange('endpoint', e.target.value)}
              style={{ width: '100%', padding: '6px', marginTop: 8 }}
            />
          </>
        );
      case 'Slack Message':
        return (
          <>
            <label>Canal:</label>
            <input
              type="text"
              value={selectedNode.data.channel || ''}
              onChange={(e) => handleFieldChange('channel', e.target.value)}
              style={{ width: '100%', padding: '6px', marginTop: 8 }}
            />
            <label>Mensagem:</label>
            <input
              type="text"
              value={selectedNode.data.message || ''}
              onChange={(e) => handleFieldChange('message', e.target.value)}
              style={{ width: '100%', padding: '6px', marginTop: 8 }}
            />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh', width: '100vw' }}>
      <div style={{ flex: 1 }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={onNodeClick}
          fitView
        >
          <MiniMap />
          <Controls />
          <Background variant="dots" gap={12} size={1} />
        </ReactFlow>
      </div>

      {/* Painel lateral de edição */}
      <div style={{ width: 300, padding: 20, backgroundColor: '#f7f7f7', borderLeft: '1px solid #ddd' }}>
        <h3>Edição de Nó</h3>
        {selectedNode ? (
          <>
            <p><strong>ID:</strong> {selectedNode.id}</p>
            <label>Label:</label>
            <input
              type="text"
              value={selectedNode.data.label}
              onChange={(e) => handleFieldChange('label', e.target.value)}
              style={{ width: '100%', padding: '6px', marginTop: 8 }}
            />
            {renderCustomFields()}
          </>
        ) : (
          <p>Nenhum nó selecionado</p>
        )}

        <hr style={{ margin: '20px 0' }} />

        <button onClick={handleRunWorkflow} style={{ width: '100%', padding: 10, backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: 4 }}>
          Rodar Workflow
        </button>

        <button onClick={handleSaveWorkflow} style={{ width: '100%', padding: 10, marginTop: 10 }}>
          Salvar Workflow
        </button>

        <button onClick={handleLoadWorkflow} style={{ width: '100%', padding: 10, marginTop: 10 }}>
          Carregar Workflow
        </button>

        {runResult && (
          <div style={{ marginTop: 20 }}>
            <h4>Resultado</h4>
            <pre style={{ whiteSpace: 'pre-wrap', fontSize: 12, background: '#eee', padding: 10 }}>
              {JSON.stringify(runResult, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
