// textNode.js
// Supports auto-resize and dynamic variable handles ({{ varName }}).

import { useState, useEffect, useRef, useMemo } from 'react';
import { useStore } from '../store';
import { BaseNode } from './BaseNode';

const VAR_REGEX = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;

export const TextNode = ({ id, data }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const textareaRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 220, height: 'auto' });

  const handleTextChange = (e) => {
    const newText = e.target.value;
    setCurrText(newText);
    updateNodeField(id, 'text', newText);
  };

  // Extract unique variables from text
  const variables = useMemo(() => {
    const matches = [];
    let match;
    const regex = new RegExp(VAR_REGEX);
    while ((match = regex.exec(currText)) !== null) {
      if (!matches.includes(match[1])) {
        matches.push(match[1]);
      }
    }
    return matches;
  }, [currText]);

  // Auto-resize logic
  useEffect(() => {
    if (textareaRef.current) {
      const ta = textareaRef.current;
      ta.style.height = 'auto';
      ta.style.height = ta.scrollHeight + 'px';

      // Adjust node width based on longest line
      const lines = currText.split('\n');
      const maxLineLen = Math.max(...lines.map(l => l.length), 15);
      const newWidth = Math.max(220, Math.min(400, maxLineLen * 7.5 + 40));
      setDimensions({ width: newWidth, height: 'auto' });
    }
  }, [currText]);

  // Build dynamic input handles from variables
  const dynamicInputs = variables.map(v => ({ id: v, label: v }));

  return (
    <BaseNode
      id={id}
      title="Text"
      icon="📝"
      inputs={dynamicInputs}
      outputs={[{ id: 'output' }]}
      style={{ width: dimensions.width }}
    >
      <div className="node-field">
        <label>Text</label>
        <textarea
          ref={textareaRef}
          value={currText}
          onChange={handleTextChange}
          rows={1}
          style={{ overflow: 'hidden' }}
          placeholder='Type text or use {{ variable }} to create inputs...'
        />
      </div>
    </BaseNode>
  );
};
