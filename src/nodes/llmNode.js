// llmNode.js

import { useState } from 'react';
import { useStore } from '../store';
import { BaseNode } from './BaseNode';

export const LLMNode = ({ id, data }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);
  const [model, setModel] = useState(data?.model || 'gpt-4o');
  const [temperature, setTemperature] = useState(data?.temperature || 0.7);

  const handleModelChange = (e) => {
    const newModel = e.target.value;
    setModel(newModel);
    updateNodeField(id, 'model', newModel);
  };

  const handleTempChange = (e) => {
    const newTemp = parseFloat(e.target.value);
    setTemperature(newTemp);
    updateNodeField(id, 'temperature', newTemp);
  };

  return (
    <BaseNode
      id={id}
      title="LLM"
      icon="🤖"
      inputs={[
        { id: 'system', label: 'system' },
        { id: 'prompt', label: 'prompt' },
      ]}
      outputs={[{ id: 'response' }]}
    >
      <div className="node-field">
        <label>Model</label>
        <select value={model} onChange={handleModelChange}>
          <option value="gpt-4o">GPT-4o</option>
          <option value="gpt-4-turbo">GPT-4 Turbo</option>
          <option value="claude-3-5-sonnet">Claude 3.5 Sonnet</option>
        </select>
      </div>
      <div className="node-field">
        <label>Temperature ({temperature})</label>
        <input 
          type="range" 
          min="0" 
          max="1" 
          step="0.1" 
          value={temperature} 
          onChange={handleTempChange} 
        />
      </div>
    </BaseNode>
  );
};
