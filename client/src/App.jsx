import { useState, useCallback, useEffect } from 'react';
import ReactFlow, { Background, Controls, useNodesState, useEdgesState } from 'reactflow';
import 'reactflow/dist/style.css';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';
import InputNode from './nodes/InputNode';
import ResultNode from './nodes/ResultNode';
import Sidebar from './Sidebar';
import './App.css';

const nodeTypes = {
  inputNode: InputNode,
  resultNode: ResultNode,
};

const initialEdges = [
  { id: 'e1-2', source: '1', target: '2', animated: true, style: { stroke: '#6366F1', strokeWidth: 2 } }
];

export default function App() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [history, setHistory] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth > 640);
  const isMobile = window.innerWidth <= 640;

  const getNodes = useCallback((p, r, l) => [
    {
      id: '1',
      type: 'inputNode',
      position: { x: 40, y: 60 },
      data: { prompt: p, onChange: (val) => setPrompt(val) },
    },
    {
      id: '2',
      type: 'resultNode',
      position: { x: 360, y: 60 },
      data: { response: r, loading: l },
    },
  ], []);

  const [nodes, setNodes, onNodesChange] = useNodesState(getNodes('', '', false));
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  useEffect(() => { fetchHistory(); }, []);

  const fetchHistory = async () => {
    try {
      const res = await axios.get('/api/history');
      setHistory(res.data.history);
    } catch (err) {
      console.error('Failed to fetch history');
    }
  };

  const runFlow = async () => {
    if (!prompt.trim()) return toast.error('Please enter a prompt!');
    setLoading(true);
    setNodes(getNodes(prompt, '', true));
    try {
      const res = await axios.post('/api/ask-ai', { prompt });
      const aiResponse = res.data.response;
      setResponse(aiResponse);
      setNodes(getNodes(prompt, aiResponse, false));
      toast.success('AI response received!');
    } catch (err) {
      toast.error('Error getting AI response');
      setNodes(getNodes(prompt, '', false));
    }
    setLoading(false);
  };

  const saveFlow = async () => {
    if (!prompt || !response) return toast.error('Run the flow first!');
    setSaving(true);
    try {
      await axios.post('/api/save', { prompt, response });
      toast.success('Saved to MongoDB!');
      fetchHistory();
    } catch (err) {
      toast.error('Error saving');
    }
    setSaving(false);
  };

  const handleSelectHistory = (item) => {
    setPrompt(item.prompt);
    setResponse(item.response);
    setNodes(getNodes(item.prompt, item.response, false));
    setSidebarOpen(false);
    toast('Loaded from history!', { icon: '🕐' });
  };

  const syncedNodes = nodes.map(node => {
    if (node.id === '1') return { ...node, data: { prompt, onChange: (val) => setPrompt(val) } };
    if (node.id === '2') return { ...node, data: { response, loading } };
    return node;
  });

  return (
    <div className="app-container">
      <Toaster position="top-right" />

      {/* Mobile overlay */}
      {isMobile && (
        <div
          className={`sidebar-overlay ${sidebarOpen ? 'active' : ''}`}
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <Sidebar
        history={history}
        onSelect={handleSelectHistory}
        isOpen={sidebarOpen}
        isMobile={isMobile}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="main-content">
        <div className="header">
          <div className="header-left">
            <button className="menu-btn" onClick={() => setSidebarOpen(!sidebarOpen)}>
              ☰
            </button>
            <h1 className="header-title">⚡ FutureBlink AI Flow</h1>
            <span className="header-badge">LIVE</span>
          </div>
          <div className="header-right">
            <button onClick={runFlow} disabled={loading} className={`btn btn-run ${loading ? 'btn-disabled' : ''}`}>
              {loading ? '⏳ Running...' : '▶ Run Flow'}
            </button>
            <button onClick={saveFlow} disabled={saving} className={`btn btn-save ${saving ? 'btn-disabled' : ''}`}>
              {saving ? '...' : '💾 Save'}
            </button>
          </div>
        </div>

        <div className="canvas">
          <ReactFlow
            nodes={syncedNodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            nodeTypes={nodeTypes}
            fitView
            fitViewOptions={{ padding: 0.3 }}
          >
            <Background color="#C7D2FE" gap={24} />
            <Controls />
          </ReactFlow>
        </div>
      </div>
    </div>
  );
}
