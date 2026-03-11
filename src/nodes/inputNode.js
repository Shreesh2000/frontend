// inputNode.js

import { useState } from 'react';
import { useStore } from '../store';
import { BaseNode } from './BaseNode';

export const InputNode = ({ id, data }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);
  const results = useStore((state) => state.results);
  const [currName, setCurrName] = useState(data?.inputName || id.replace('customInput-', 'input_'));
  const [inputType, setInputType] = useState(data?.inputType || 'Text');

  const handleNameChange = (e) => {
    const newName = e.target.value;
    setCurrName(newName);
    updateNodeField(id, 'inputName', newName);
  };

  const handleTypeChange = (e) => {
    const newType = e.target.value;
    setInputType(newType);
    updateNodeField(id, 'inputType', newType);
  };

  return (
    <BaseNode
      id={id}
      title="Input"
      icon="📥"
      outputs={[{ id: 'value' }]}
    >
      <div className="node-field">
        <label>Name</label>
        <input
          type="text"
          value={currName}
          onChange={handleNameChange}
        />
      </div>
      <div className="node-field">
        <label>Type</label>
        <select value={inputType} onChange={handleTypeChange}>
          <option value="Text">Text</option>
          <option value="File">File</option>
        </select>
      </div>
      {results[id] && (
        <div className="node-result">
          <span className="node-result-label">Current Value</span>
          <div className="node-result-value">{results[id]}</div>
        </div>
      )}
    </BaseNode>
  );
};
