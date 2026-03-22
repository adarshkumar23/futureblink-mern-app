import { Handle, Position } from 'reactflow';

export default function ResultNode({ data }) {
  return (
    <div style={{
      padding: '16px',
      background: 'linear-gradient(135deg, #0D1117, #0B1F1A)',
      border: '1px solid rgba(16,185,129,0.4)',
      borderRadius: '16px',
      width: '260px',
      boxShadow: '0 0 40px rgba(16,185,129,0.12), 0 8px 32px rgba(0,0,0,0.5)',
    }}>
      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes glowPulse {
          0%, 100% { box-shadow: 0 0 10px #10B981; }
          50% { box-shadow: 0 0 20px #10B981, 0 0 40px #10B981; }
        }
      `}</style>

      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
        <div style={{
          width: '8px', height: '8px', borderRadius: '50%',
          background: 'linear-gradient(135deg, #10B981, #06B6D4)',
          boxShadow: '0 0 10px #10B981',
          animation: data.loading ? 'glowPulse 1s infinite' : 'none'
        }} />
        <span style={{
          fontSize: '10px', fontWeight: '700',
          letterSpacing: '2px', textTransform: 'uppercase',
          background: 'linear-gradient(135deg, #10B981, #06B6D4)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
        }}>AI Response</span>
      </div>

      <div style={{
        minHeight: '110px',
        padding: '10px 12px',
        background: 'rgba(0,0,0,0.4)',
        borderRadius: '10px',
        border: '1px solid rgba(16,185,129,0.15)',
        fontSize: '13px',
        color: '#E2E8F0',
        whiteSpace: 'pre-wrap',
        lineHeight: '1.6',
        fontFamily: 'Space Grotesk, sans-serif',
      }}>
        {data.loading ? (
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center', justifyContent: 'center', height: '90px' }}>
            {[
              { color: '#8B5CF6' },
              { color: '#10B981' },
              { color: '#EC4899' },
            ].map((dot, i) => (
              <div key={i} style={{
                width: '10px', height: '10px', borderRadius: '50%',
                background: dot.color,
                boxShadow: `0 0 10px ${dot.color}`,
                animation: 'bounce 0.8s infinite',
                animationDelay: `${i * 0.15}s`
              }} />
            ))}
          </div>
        ) : data.response ? (
          <span>{data.response}</span>
        ) : (
          <span style={{ color: '#1E293B', fontStyle: 'italic' }}>
            Response will appear here...
          </span>
        )}
      </div>

      <Handle type="target" position={Position.Left} style={{
        background: 'linear-gradient(135deg, #10B981, #06B6D4)',
        border: '2px solid #060818', width: '12px', height: '12px',
        boxShadow: '0 0 10px #10B981'
      }} />
    </div>
  );
}