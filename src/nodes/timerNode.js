// timerNode.js — Delay / scheduler node

import { useState } from 'react';
import { BaseNode } from './BaseNode';

export const TimerNode = ({ id, data }) => {
  const [delay, setDelay] = useState(data?.delay || 1000);
  const [unit, setUnit] = useState(data?.unit || 'ms');

  return (
    <BaseNode
      id={id}
      title="Timer"
      icon="⏱️"
      inputs={[{ id: 'trigger', label: 'trigger' }]}
      outputs={[{ id: 'done', label: 'done' }]}
    >
      <div className="node-field">
        <label>Delay</label>
        <input
          type="number"
          value={delay}
          min={0}
          onChange={(e) => setDelay(Number(e.target.value))}
        />
      </div>
      <div className="node-field">
        <label>Unit</label>
        <select value={unit} onChange={(e) => setUnit(e.target.value)}>
          <option value="ms">Milliseconds</option>
          <option value="s">Seconds</option>
          <option value="m">Minutes</option>
        </select>
      </div>
    </BaseNode>
  );
};
