// BaseNode.js
// Reusable node abstraction providing consistent layout, handles, and styling.

import { Handle, Position } from 'reactflow';
import './nodeStyles.css';

export const BaseNode = ({
  id,
  title,
  icon = '⚙️',
  inputs = [],
  outputs = [],
  children,
  style = {},
}) => {

  return (
    <div className="base-node" style={style}>
      {/* ── Header ──────────────────────────────── */}
      <div className="node-header">
        <span className="node-header-icon">{icon}</span>
        <span className="node-header-title">{title}</span>
      </div>

      {/* ── Body (node-specific content) ────────── */}
      <div className="node-body">
        {children}
      </div>

      {/* ── Left-side (target) Handles ──────────── */}
      {inputs.map((inp, idx) => {
        const handleId = typeof inp === 'string' ? inp : inp.id;
        const label = typeof inp === 'string' ? inp : inp.label;
        const topPercent = ((idx + 1) / (inputs.length + 1)) * 100;
        return (
          <div key={`input-${handleId}`}>
            <Handle
              type="target"
              position={Position.Left}
              id={`${id}-${handleId}`}
              style={{ top: `${topPercent}%` }}
            />
            {label && (
              <span
                className="handle-label handle-label-left"
                style={{ top: `${topPercent}%` }}
              >
                {label}
              </span>
            )}
          </div>
        );
      })}

      {/* ── Right-side (source) Handles ─────────── */}
      {outputs.map((out, idx) => {
        const handleId = typeof out === 'string' ? out : out.id;
        const label = typeof out === 'string' ? out : out.label;
        const topPercent = ((idx + 1) / (outputs.length + 1)) * 100;
        return (
          <div key={`output-${handleId}`}>
            <Handle
              type="source"
              position={Position.Right}
              id={`${id}-${handleId}`}
              style={{ top: `${topPercent}%` }}
            />
            {label && (
              <span
                className="handle-label handle-label-right"
                style={{ top: `${topPercent}%` }}
              >
                {label}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
};
