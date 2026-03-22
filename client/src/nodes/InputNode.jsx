import { Handle, Position } from 'reactflow';

export default function InputNode({ data }) {
  return (
    <div style={{
      padding: '16px',
      background: 'linear-gradient(135deg, #0D1117, #1A0B2E)',
      border: '1px solid rgba(139,92,246,0.4)',
      borderRadius: '16px',
      width: '260px',
      boxShadow: '0 0 40px rgba(139,92,246,0.15), 0 8px 32px rgba(0,0,0,0.5)',
    }}>
      <style>{`
        .input-ta::placeholder { color: #1E293B; }
        .input-ta:focus {
          border-color: rgba(139,92,246,0.6) !important;
          box-shadow: 0 0 20px rgba(139,92,246,0.15) !important;
          outline: none;
        }
      `}</style>

      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
        <div style={{
          width: '8px', height: '8px', borderRadius: '50%',
          background: 'linear-gradient(135deg, #8B5CF6, #06B6D4)',
          boxShadow: '0 0 10px #8B5CF6'
        }} />
        <span style={{
          fontSize: '10px', fontWeight: '700',
          letterSpacing: '2px', textTransform: 'uppercase',
          background: 'linear-gradient(135deg, #8B5CF6, #06B6D4)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
        }}>Input Prompt</span>
      </div>

      <textarea
        rows={5}
        placeholder="Ask anything..."
        value={data.prompt}
        onChange={(e) => data.onChange(e.target.value)}
        className="input-ta"
        style={{
          width: '100%',
          padding: '10px 12px',
          borderRadius: '10px',
          border: '1px solid rgba(139,92,246,0.2)',
          background: 'rgba(0,0,0,0.4)',
          color: '#F1F5F9',
          resize: 'none',
          fontSize: '13px',
          lineHeight: '1.6',
          boxSizing: 'border-box',
          fontFamily: 'Space Grotesk, sans-serif',
          transition: 'all 0.2s',
        }}
      />

      <div style={{
        marginTop: '8px', fontSize: '10px', textAlign: 'right',
        fontFamily: 'JetBrains Mono, monospace',
        background: 'linear-gradient(135deg, #8B5CF6, #06B6D4)',
        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
      }}>
        {data.prompt?.length || 0} chars
      </div>

      <Handle type="source" position={Position.Right} style={{
        background: 'linear-gradient(135deg, #8B5CF6, #06B6D4)',
        border: '2px solid #060818', width: '12px', height: '12px',
        boxShadow: '0 0 10px #8B5CF6'
      }} />
    </div>
  );
}