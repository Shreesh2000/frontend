// outputNode.js

import { useState } from 'react';
import { BaseNode } from './BaseNode';
import { useStore } from '../store';

export const OutputNode = ({ id, data }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);
  const results = useStore((state) => state.results);
  const [currName, setCurrName] = useState(data?.outputName || id.replace('customOutput-', 'output_'));
  const [outputType, setOutputType] = useState(data?.outputType || 'Text');

  const handleNameChange = (e) => {
    const newName = e.target.value;
    setCurrName(newName);
    updateNodeField(id, 'outputName', newName);
  };

  const handleTypeChange = (e) => {
    const newType = e.target.value;
    setOutputType(newType);
    updateNodeField(id, 'outputType', newType);
  };

  return (
    <BaseNode
      id={id}
      title="Output"
      icon="📤"
      inputs={[{ id: 'value' }]}
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
        <select value={outputType} onChange={handleTypeChange}>
          <option value="Text">Text</option>
          <option value="File">File</option>
        </select>
      </div>
      {results[id] && (
        <div className="node-result">
          <span className="node-result-label">Result</span>
          <div className="node-result-value">{results[id]}</div>
        </div>
      )}
    </BaseNode>
  );
};
