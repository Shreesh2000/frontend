// filterNode.js — Data filter with condition configuration

import { useState } from 'react';
import { BaseNode } from './BaseNode';

export const FilterNode = ({ id, data }) => {
  const [condition, setCondition] = useState(data?.condition || 'equals');
  const [value, setValue] = useState(data?.value || '');

  return (
    <BaseNode
      id={id}
      title="Filter"
      icon="🔍"
      inputs={[{ id: 'data', label: 'data' }]}
      outputs={[
        { id: 'passed', label: 'passed' },
        { id: 'rejected', label: 'rejected' },
      ]}
    >
      <div className="node-field">
        <label>Condition</label>
        <select value={condition} onChange={(e) => setCondition(e.target.value)}>
          <option value="equals">Equals</option>
          <option value="not_equals">Not Equals</option>
          <option value="contains">Contains</option>
          <option value="greater_than">Greater Than</option>
          <option value="less_than">Less Than</option>
          <option value="regex">Regex Match</option>
        </select>
      </div>
      <div className="node-field">
        <label>Value</label>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Filter value..."
        />
      </div>
    </BaseNode>
  );
};
