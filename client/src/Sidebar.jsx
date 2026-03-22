import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export default function Sidebar({ history = [], onSelect, isOpen, isMobile, onClose }) {
  const colors = [
    { border: 'rgba(139,92,246,0.25)', bg: 'rgba(139,92,246,0.06)', dot: '#8B5CF6' },
    { border: 'rgba(16,185,129,0.25)', bg: 'rgba(16,185,129,0.06)', dot: '#10B981' },
    { border: 'rgba(236,72,153,0.25)', bg: 'rgba(236,72,153,0.06)', dot: '#EC4899' },
    { border: 'rgba(245,158,11,0.25)', bg: 'rgba(245,158,11,0.06)', dot: '#F59E0B' },
    { border: 'rgba(6,182,212,0.25)', bg: 'rgba(6,182,212,0.06)', dot: '#06B6D4' },
  ];

  const sidebarStyle = isMobile ? {
    position: 'fixed',
    left: 0, top: 0,
    height: '100%',
    width: '260px',
    zIndex: 100,
    transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
    transition: 'transform 0.3s cubic-bezier(0.4,0,0.2,1)',
  } : {
    width: isOpen ? '270px' : '0px',
    minWidth: isOpen ? '270px' : '0px',
    transition: 'width 0.3s cubic-bezier(0.4,0,0.2,1), min-width 0.3s cubic-bezier(0.4,0,0.2,1)',
  };

  return (
    <div style={{
      ...sidebarStyle,
      background: '#0A0F1E',
      color: '#F1F5F9',
      display: 'flex',
      flexDirection: 'column',
      overflowY: 'auto',
      overflowX: 'hidden',
      borderRight: '1px solid rgba(139,92,246,0.15)',
      boxShadow: '4px 0 30px rgba(139,92,246,0.08)',
    }}>

      {/* Header */}
      <div style={{
        padding: '14px 16px',
        borderBottom: '1px solid rgba(139,92,246,0.15)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: 'linear-gradient(135deg, rgba(139,92,246,0.08), rgba(6,182,212,0.08))',
        flexShrink: 0,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{
            width: '8px', height: '8px', borderRadius: '50%',
            background: 'linear-gradient(135deg, #8B5CF6, #06B6D4)',
            boxShadow: '0 0 8px #8B5CF6'
          }} />
          <h2 style={{
            margin: 0, fontSize: '11px', fontWeight: '700',
            letterSpacing: '2px', textTransform: 'uppercase',
            background: 'linear-gradient(135deg, #8B5CF6, #06B6D4)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
          }}>History</h2>
        </div>
        <button onClick={onClose} style={{
          background: 'rgba(139,92,246,0.1)', border: '1px solid rgba(139,92,246,0.2)',
          color: '#8B5CF6', fontSize: '13px', cursor: 'pointer',
          borderRadius: '6px', padding: '2px 8px', transition: 'all 0.2s',
        }}>✕</button>
      </div>

      {/* Items */}
      <div style={{ padding: '10px', flex: 1, overflowY: 'auto' }}>
        {history.length === 0 ? (
          <div style={{ textAlign: 'center', marginTop: '40px', padding: '0 16px' }}>
            <div style={{ fontSize: '28px', marginBottom: '8px' }}>🕐</div>
            <p style={{ color: '#334155', fontSize: '12px', lineHeight: '1.6' }}>
              No history yet.<br />Run and save a prompt!
            </p>
          </div>
        ) : (
          history.map((item, index) => {
            const c = colors[index % colors.length];
            return (
              <div
                key={item._id}
                onClick={() => onSelect(item)}
                style={{
                  padding: '12px', borderRadius: '12px', marginBottom: '8px',
                  background: c.bg, cursor: 'pointer',
                  border: `1.5px solid ${c.border}`, transition: 'all 0.2s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateX(4px)';
                  e.currentTarget.style.boxShadow = `0 4px 15px ${c.border}`;
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateX(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: c.dot, flexShrink: 0 }} />
                  <p style={{
                    margin: 0, fontSize: '12px', fontWeight: '600', color: '#E2E8F0',
                    overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'
                  }}>{item.prompt}</p>
                </div>
                <p style={{
                  margin: '0 0 6px 0', fontSize: '11px', color: '#475569',
                  overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                  paddingLeft: '12px'
                }}>{item.response}</p>
                <p style={{
                  margin: 0, fontSize: '10px', color: c.dot,
                  fontFamily: 'JetBrains Mono, monospace', paddingLeft: '12px'
                }}>{dayjs(item.createdAt).fromNow()}</p>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}